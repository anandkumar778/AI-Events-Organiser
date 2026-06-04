import { useAuthStore } from "./authStore";

export const useAuth = () => {
  const { user, setUser } =
    useAuthStore();

  return {
    user,
    setUser,
  };
};