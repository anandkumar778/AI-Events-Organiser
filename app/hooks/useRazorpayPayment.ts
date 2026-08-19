"use client";

import { useCallback, useState } from "react";
import razorpayService from "@/app/services/razorpay/razorpayService";
import { RazorpayOptions } from "@/app/types/razorpay";

const RAZORPAY_SCRIPT_URL = "https://checkout.razorpay.com/v1/checkout.js";

let scriptLoadPromise: Promise<void> | null = null;

const loadRazorpayScript = (): Promise<void> => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Razorpay can only run in browser"));
  }

  if (window.Razorpay) {
    return Promise.resolve();
  }

  if (scriptLoadPromise) {
    return scriptLoadPromise;
  }

  scriptLoadPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector(
      `script[src="${RAZORPAY_SCRIPT_URL}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () =>
        reject(new Error("Failed to load Razorpay script"))
      );
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Razorpay script"));
    document.body.appendChild(script);
  });

  return scriptLoadPromise;
};

interface OpenCheckoutParams {
  bookingId: string;
  eventTitle: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
}

export const useRazorpayPayment = () => {
  const [loading, setLoading] = useState(false);

  const openRazorpayCheckout = useCallback(
    async ({
      bookingId,
      eventTitle,
      userName,
      userEmail,
      userPhone,
    }: OpenCheckoutParams): Promise<any> => {
      setLoading(true);

      try {
        await loadRazorpayScript();

        const orderResponse = await razorpayService.createOrder(bookingId);
        if (!orderResponse.success) {
          throw new Error(
            typeof orderResponse.message === "string"
              ? orderResponse.message
              : "Failed to create order"
          );
        }

        const data = orderResponse.data || (orderResponse as any);
        const orderId = data.orderId || data.id;
        const keyId = data.keyId || data.key_id;
        const amount = data.amount;
        const currency = data.currency || "INR";

        if (!orderId) {
          throw new Error("Razorpay Order ID was not returned by server");
        }

        return await new Promise<any>((resolve, reject) => {
          const options: RazorpayOptions = {
            key: keyId,
            amount,
            currency,
            name: "AI Events Organiser",
            description: `Ticket for ${eventTitle}`,
            order_id: orderId,
            prefill: {
              name: userName,
              email: userEmail,
              contact: userPhone,
            },
            theme: { color: "#6366f1" },
            handler: async (response) => {
              try {
                const verifyResponse = await razorpayService.verifyPayment({
                  bookingId,
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                });

                if (verifyResponse.success) {
                  resolve(verifyResponse.data);
                } else {
                  reject(
                    new Error(
                      typeof verifyResponse.message === "string"
                        ? verifyResponse.message
                        : "Payment verification failed"
                    )
                  );
                }
              } catch (err) {
                reject(err);
              }
            },
            modal: {
              ondismiss: () => resolve(null),
            },
          };

          const razorpay = new window.Razorpay(options);
          razorpay.open();
        });
      } catch (err: any) {
        const message =
          typeof err === "string"
            ? err
            : err?.message
            ? err.message
            : err?.response?.data?.message
            ? err.response.data.message
            : "Razorpay checkout error";
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { openRazorpayCheckout, loading };
};
