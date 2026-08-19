import api from "../api";
import {
  RazorpayOrderResponse,
  RazorpayVerifyPayload,
  RazorpayVerifyResponse,
  PaymentStatusResponse,
} from "@/app/types/razorpay";

export interface QRPayload {
  qrDataURL: string;
  upiString: string;
  amount: number;
  bookingId: string;
}

export interface QRResponse {
  success: boolean;
  data: QRPayload;
  message?: string;
}

class RazorpayService {
  async createOrder(bookingId: string): Promise<RazorpayOrderResponse> {
    try {
      const response = await api.post<RazorpayOrderResponse>(
        "/razorpay/create-order",
        { bookingId }
      );
      return response.data;
    } catch (error: any) {
      const message =
        typeof error?.response?.data?.message === "string"
          ? error.response.data.message
          : typeof error?.message === "string"
          ? error.message
          : "Failed to create payment order";
      // console.error("razorpayService.createOrder error:", message, error);
      const err = new Error(message);
      (err as any).status = error?.response?.status;
      throw err;
    }
  }

  /** Fetch UPI QR code for a booking (calls GET /api/razorpay/qr/:bookingId) */
  async getQR(bookingId: string): Promise<QRResponse> {
    try {
      const response = await api.get<QRResponse>(`/razorpay/qr/${bookingId}`);
      return response.data;
    } catch (error: any) {
      const message =
        typeof error?.response?.data?.message === "string"
          ? error.response.data.message
          : typeof error?.message === "string"
          ? error.message
          : "Failed to generate QR code";
      console.error("razorpayService.getQR error:", message, error);
      const err = new Error(message);
      (err as any).status = error?.response?.status;
      throw err;
    }
  }

  async verifyPayment(
    payload: RazorpayVerifyPayload
  ): Promise<RazorpayVerifyResponse> {
    try {
      const response = await api.post<RazorpayVerifyResponse>(
        "/razorpay/verify",
        payload
      );
      return response.data;
    } catch (error: any) {
      const message =
        typeof error?.response?.data?.message === "string"
          ? error.response.data.message
          : typeof error?.message === "string"
          ? error.message
          : "Payment verification failed";
      console.error("razorpayService.verifyPayment error:", message, error);
      const err = new Error(message);
      (err as any).status = error?.response?.status;
      throw err;
    }
  }

  async getPaymentStatus(bookingId: string): Promise<PaymentStatusResponse> {
    try {
      const response = await api.get<PaymentStatusResponse>(
        `/razorpay/status/${bookingId}`
      );
      return response.data;
    } catch (error: any) {
      const message =
        typeof error?.response?.data?.message === "string"
          ? error.response.data.message
          : typeof error?.message === "string"
          ? error.message
          : "Failed to fetch payment status";
      const err = new Error(message);
      (err as any).status = error?.response?.status;
      throw err;
    }
  }
}

export default new RazorpayService();
