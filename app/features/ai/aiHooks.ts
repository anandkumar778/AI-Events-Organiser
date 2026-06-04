import { useAIStore } from "./aiStore";

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