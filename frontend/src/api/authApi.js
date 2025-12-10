// src/api/authApi.js
import { useAxios } from "./axios";

export const useAuthApi = () => {
  const api = useAxios();

  // Login user (admin or customer)
  const login = (credentials) => {
    return api.post("/auth/login", credentials);
  };

  // Optional: fetch user profile (if backend has it)
  const getProfile = () => {
    return api.get("/auth/profile");
  };

  return { login, getProfile };
};
