"use client";

import { useState, useCallback } from "react";
import aiService, {
  TitleGeneratorRequest,
  DescriptionGeneratorRequest,
  BudgetPlannerRequest,
  BudgetPlannerResponse,
  SchedulePlannerRequest,
  SchedulePlannerResponse,
} from "@/app/services/aiService";

interface GenerationHistory {
  id: string;
  type: "title" | "description" | "budget" | "schedule";
  generated: string | string[] | Record<string, unknown>;
  timestamp: string;
}

interface UseAIReturn {
  // State
  isLoading: boolean;
  error: string | null;
  generationHistory: GenerationHistory[];

  // Methods - Title Generation
  generateTitle: (data: TitleGeneratorRequest) => Promise<string | string[]>;

  // Methods - Description Generation
  generateDescription: (data: DescriptionGeneratorRequest) => Promise<string>;

  // Methods - Budget Planning
  planBudget: (data: BudgetPlannerRequest) => Promise<BudgetPlannerResponse>;

  // Methods - Schedule Planning
  planSchedule: (data: SchedulePlannerRequest) => Promise<SchedulePlannerResponse>;

  // Methods - History
  getHistory: () => Promise<void>;
  clearHistory: () => Promise<void>;

  // Utility
  clearError: () => void;
}

export const useAI = (): UseAIReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generationHistory, setGenerationHistory] = useState<GenerationHistory[]>([]);

  const clearError = useCallback(() => setError(null), []);

  const addToHistory = useCallback(
    (
      type: "title" | "description" | "budget" | "schedule",
      generated: string | string[] | Record<string, unknown>
    ) => {
      const newEntry: GenerationHistory = {
        id: Date.now().toString(),
        type,
        generated,
        timestamp: new Date().toISOString(),
      };
      setGenerationHistory((prev) => [newEntry, ...prev]);
    },
    []
  );

  const generateTitle = useCallback(
    async (data: TitleGeneratorRequest): Promise<string | string[]> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await aiService.generateTitle(data);
        const generated = typeof response.data.generated === "string"
          ? response.data.generated
          : Array.isArray(response.data.generated)
          ? response.data.generated
          : JSON.stringify(response.data.generated);
        addToHistory("title", generated);
        return generated;
      } catch (err: any) {
        setError(err.message || "Failed to generate title");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [addToHistory]
  );

  const generateDescription = useCallback(
    async (data: DescriptionGeneratorRequest): Promise<string> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await aiService.generateDescription(data);
        const generated = typeof response.data.generated === "string"
          ? response.data.generated
          : Array.isArray(response.data.generated)
          ? response.data.generated.join("\n")
          : JSON.stringify(response.data.generated);
        addToHistory("description", generated);
        return generated;
      } catch (err: any) {
        setError(err.message || "Failed to generate description");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [addToHistory]
  );

  const planBudget = useCallback(
    async (data: BudgetPlannerRequest): Promise<BudgetPlannerResponse> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await aiService.planBudget(data);
        addToHistory("budget", response.data);
        return response;
      } catch (err: any) {
        setError(err.message || "Failed to plan budget");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [addToHistory]
  );

  const planSchedule = useCallback(
    async (data: SchedulePlannerRequest): Promise<SchedulePlannerResponse> => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await aiService.planSchedule(data);
        addToHistory("schedule", response.data);
        return response;
      } catch (err: any) {
        setError(err.message || "Failed to plan schedule");
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [addToHistory]
  );

  const getHistory = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await aiService.getHistory();
      setGenerationHistory(response.data || []);
    } catch (err: any) {
      setError(err.message || "Failed to fetch history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearHistoryFn = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      await aiService.clearHistory();
      setGenerationHistory([]);
    } catch (err: any) {
      setError(err.message || "Failed to clear history");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    generationHistory,
    generateTitle,
    generateDescription,
    planBudget,
    planSchedule,
    getHistory,
    clearHistory: clearHistoryFn,
    clearError,
  };
};
