import { create } from "zustand";

interface AIState {
  result: string;

  setResult: (
    result: string
  ) => void;
}

export const useAIStore =
  create<AIState>((set) => ({
    result: "",

    setResult: (
      result
    ) =>
      set({
        result,
      }),
  }));