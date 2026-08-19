import api from "./api";
import { PaymentReceiptResponse } from "@/app/types/payment";

class PaymentService {
  async getReceipt(paymentId: string): Promise<PaymentReceiptResponse> {
    try {
      const response = await api.get<PaymentReceiptResponse>(`/payments/${paymentId}`);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to fetch receipt");
      (err as any).status = error.response?.status;
      throw err;
    }
  }
}

export default new PaymentService();
