import api from "./axios";
import type { AuthResponse, LoginPayload, RegisterPayload } from "../types";

export const login = async (payload: LoginPayload): Promise<AuthResponse> => {
  const { data } = await api.post("/auth/login", payload);
  return data;
};

export const register = async (
  payload: RegisterPayload,
): Promise<AuthResponse> => {
  const { data } = await api.post("/auth/register", payload);
  return data;
};
