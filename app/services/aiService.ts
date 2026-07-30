import api from "./api";

export interface AIGenerateRequest {
  type: "title" | "description" | "budget" | "schedule";
  eventDetails: {
    title?: string;
    category?: string;
    attendees?: number;
    budget?: number;
    date?: string;
    location?: string;
    description?: string;
  };
}

export interface AIGenerateResponse {
  success: boolean;
  data: {
    generated: string | string[] | Record<string, any>;
    type: string;
    timestamp?: string;
  };
  message?: string;
}

export interface TitleGeneratorRequest {
  category: string;
  theme?: string;
  style?: "formal" | "casual" | "fun" | "professional";
}

export interface DescriptionGeneratorRequest {
  title: string;
  category: string;
  attendees?: number;
  tone?: "formal" | "casual" | "exciting" | "professional";
}

export interface BudgetPlannerRequest {
  eventType: string;
  attendees: number;
  location: string;
  duration?: number;
  premium?: boolean;
}

export interface BudgetPlannerResponse {
  success: boolean;
  data: {
    totalBudget: number;
    breakdown: Record<string, number>;
    recommendations: string[];
    timestamp?: string;
  };
  message?: string;
}

export interface SchedulePlannerRequest {
  eventTitle: string;
  eventDate: string;
  eventDuration: number;
  activities: string[];
  attendees?: number;
}

export interface SchedulePlannerResponse {
  success: boolean;
  data: {
    schedule: Array<{
      time: string;
      activity: string;
      duration: number;
    }>;
    tips: string[];
    timestamp?: string;
  };
  message?: string;
}

class AIService {
  // Generate event title
  async generateTitle(data: TitleGeneratorRequest): Promise<AIGenerateResponse> {
    try {
      const response = await api.post<AIGenerateResponse>("/ai/generate-title", data);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to generate title");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Generate event description
  async generateDescription(data: DescriptionGeneratorRequest): Promise<AIGenerateResponse> {
    try {
      const response = await api.post<AIGenerateResponse>("/ai/generate-description", data);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to generate description");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Plan budget
  async planBudget(data: BudgetPlannerRequest): Promise<BudgetPlannerResponse> {
    try {
      const response = await api.post<BudgetPlannerResponse>("/ai/plan-budget", data);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to plan budget");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Plan schedule
  async planSchedule(data: SchedulePlannerRequest): Promise<SchedulePlannerResponse> {
    try {
      const response = await api.post<SchedulePlannerResponse>("/ai/plan-schedule", data);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to plan schedule");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Generic generate endpoint
  async generate(data: AIGenerateRequest): Promise<AIGenerateResponse> {
    try {
      const response = await api.post<AIGenerateResponse>("/ai/generate", data);
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to generate content");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Get generation history
  async getHistory(): Promise<any> {
    try {
      const response = await api.get("/ai/history");
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to fetch history");
      (err as any).status = error.response?.status;
      throw err;
    }
  }

  // Clear generation history
  async clearHistory(): Promise<AIGenerateResponse> {
    try {
      const response = await api.post<AIGenerateResponse>("/ai/history/clear");
      return response.data;
    } catch (error: any) {
      const err = new Error(error.response?.data?.message || "Failed to clear history");
      (err as any).status = error.response?.status;
      throw err;
    }
  }
}

export default new AIService();
