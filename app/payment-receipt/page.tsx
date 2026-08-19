"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/app/components/ui/Button";
import paymentService from "@/app/services/paymentService";
import { PaymentReceipt } from "@/app/types/payment";

const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });
};

const formatRupee = (value: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(value);
};

const detailItem = (label: string, value: string | number | undefined) => (
  <div className="grid grid-cols-[1fr_auto] gap-3 py-3 border-b border-slate-200 last:border-b-0">
    <span className="text-sm text-slate-600">{label}</span>
    <span className="text-sm font-medium text-slate-900 text-right">{value ?? "-"}</span>
  </div>
);

export default function PaymentReceiptPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [receipt, setReceipt] = useState<PaymentReceipt | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const paymentId = searchParams.get("paymentId");

  useEffect(() => {
    if (!paymentId) {
      setError("Payment receipt ID is missing.");
      setLoading(false);
      return;
    }

    const fetchReceipt = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await paymentService.getReceipt(paymentId);
        setReceipt(response.data);
      } catch (err: any) {
        setError(err.message || "Unable to load receipt.");
      } finally {
        setLoading(false);
      }
    };

    fetchReceipt();
  }, [paymentId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg w-full max-w-2xl text-center">
          <div className="animate-spin mx-auto mb-4 h-10 w-10 rounded-full border-4 border-slate-300 border-t-blue-600"></div>
          <p className="text-slate-700 font-medium">Loading receipt...</p>
        </div>
      </div>
    );
  }

  if (error || !receipt) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
        <div className="rounded-3xl border border-red-200 bg-white p-8 shadow-lg w-full max-w-2xl text-center">
          <p className="text-red-600 font-semibold text-lg">Unable to load payment receipt</p>
          <p className="mt-3 text-slate-600">{error ?? "The receipt details could not be found."}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row justify-center">
            <Button text="Back to Home" variant="secondary" onClick={() => router.push("/")} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
                  <span className="text-xl leading-none">✓</span>
                  Payment Successful
                </p>
                <h1 className="mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  ₹{receipt.amount.toFixed(2)} Paid
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-500 sm:text-base">
                  Your payment has been captured successfully via {receipt.paymentMethod.toUpperCase()}.
                </p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Receipt Type</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">Payment Success</p>
                <p className="mt-2 text-sm text-slate-600">Captured</p>
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {detailItem("Payment ID", receipt.paymentId ?? receipt.id)}
                {detailItem("Order ID", receipt.razorpayOrderId)}
                {detailItem("Transaction Ref.", receipt.transactionReference)}
                {detailItem("Payment Method", receipt.paymentMethod.toUpperCase())}
                {detailItem("Payment Date", formatDateTime(receipt.createdAt))}
                {detailItem("Amount Paid", formatRupee(receipt.amount))}
                {detailItem("Refund Status", receipt.refundStatus ?? "Not Refunded")}
                {detailItem("Description", receipt.description ?? "Purchase Shoes")}
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Customer Information</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {detailItem("Name", receipt.user?.name ?? "Gaurav Kumar")}
                {detailItem("Email", receipt.user?.email ?? "gaurav.kumar@example.com")}
                {detailItem("Contact", receipt.user?.phone ?? "+919999999999")}
              </div>
            </div>

            <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-900">Payment Breakdown</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {detailItem("Base Amount", formatRupee(receipt.amount - (receipt.razorpayFee ?? 0) - (receipt.tax ?? 0)))}
                {detailItem("Razorpay Fee", formatRupee(receipt.razorpayFee ?? 0))}
                {detailItem("Tax", formatRupee(receipt.tax ?? 0))}
                {detailItem("Refund Amount", formatRupee(receipt.refundAmount ?? 0))}
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Button text="Download Receipt" variant="primary" onClick={() => window.print()} />
              <Button text="Back to Home" variant="secondary" onClick={() => router.push("/")} />
            </div>
          </section>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
            <div className="space-y-6">
              <div className="rounded-3xl bg-blue-600 p-6 text-white shadow-sm">
                <p className="text-sm uppercase tracking-[0.3em] text-blue-100">Order Summary</p>
                <p className="mt-4 text-2xl font-semibold">{receipt.booking?.bookingReference ?? receipt.booking?.id ?? receipt.paymentId}</p>
                <p className="mt-2 text-sm text-blue-100">{receipt.booking ? "Booking reference for your purchase" : "Transaction reference"}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">UPI Details</h3>
                <p className="mt-3 text-sm text-slate-600">{receipt.upiVpa ?? "gaurav.kumar@exampleupi"}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-5">
                <h3 className="text-sm font-semibold text-slate-900">Order Details</h3>
                <p className="mt-3 text-sm text-slate-600">{receipt.description ?? "Purchase Shoes"}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
