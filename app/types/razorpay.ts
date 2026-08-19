export interface RazorpayOrderResponse {
  success: boolean;
  data: {
    id: string;
    key_id: string;
    orderId: string;
    amount: number;
    currency: string;
    keyId: string;
    bookingId: string;
    paymentId: string;
    qrCode?: string;
    upiString?: string;
  };
  message?: string;
}

export interface RazorpayVerifyPayload {
  bookingId: string;
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

export interface RazorpayVerifyResponse {
  success: boolean;
  message?: string;
  data: {
    payment: {
      paymentStatus: string;
      transactionId: string;
    };
    booking: {
      paymentStatus: string;
      bookingStatus: string;
    };
  };
}

export interface PaymentStatusResponse {
  success: boolean;
  data: {
    bookingId: string;
    paymentStatus: "pending" | "success" | "failed";
    bookingStatus: string;
    amount: number;
    razorpayOrderId: string | null;
  };
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  modal?: {
    ondismiss?: () => void;
  };
}

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => {
      open: () => void;
    };
  }
}
