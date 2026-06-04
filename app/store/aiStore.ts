import { create } from "zustand";

interface AIStore {
  result: string;
  loading: boolean;

  setResult: (
    result: string
  ) => void;

  setLoading: (
    loading: boolean
  ) => void;
}

export const useAIStore =
  create<AIStore>((set) => ({
    result: "",
    loading: false,

    setResult: (result) =>
      set({
        result,
      }),

    setLoading: (loading) =>
      set({
        loading,
      }),
  }));