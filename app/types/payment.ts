export interface ReceiptCustomer {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
}

export interface ReceiptBooking {
  id?: string;
  bookingReference?: string;
  createdAt?: string;
}

export interface PaymentReceipt {
  id: string;
  paymentId?: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  paymentStatus: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  transactionReference: string;
  transactionId: string;
  upiVpa?: string;
  description?: string;
  refundStatus?: string;
  razorpayFee?: number;
  tax?: number;
  refundAmount?: number;
  booking?: ReceiptBooking;
  user?: ReceiptCustomer;
  createdAt: string;
}

export interface PaymentReceiptResponse {
  success: boolean;
  data: PaymentReceipt;
  message?: string;
}
