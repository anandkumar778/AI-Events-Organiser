import { useAIStore } from "@/app/store/aiStore";

export const useAI = () => {
  const {
    result,
    setResult,
  } = useAIStore();

  return {
    result,
    setResult,
  };
};