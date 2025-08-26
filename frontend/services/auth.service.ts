import type { AxiosError } from "axios";
import api from "./http.service";

class AuthService {
  async signUp(payload: ISignUpPayLoad) {
    try {
      const res = await api.post("/auth/sign-up", payload);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw {
        message: err.response?.data?.message || err.message,
      };
    }
  }

  async verfifyEmail(payload: { token: string }) {
    try {
      const res = await api.post("/auth/verify-email", payload);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw {
        message: err.response?.data?.message || err.message,
      };
    }
  }

  async resetPassword(payload: { email: string }) {
    try {
      const res = await api.post("/auth/reset-password", payload);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw {
        message: err.response?.data?.message || err.message,
      };
    }
  }

  async createNewPassword(payload: ICreateNewPasswordPayLoad) {
    return api
      .post("/auth/create-new-password", payload)
      .then((res) => res.data);
  }
}

export const authService = new AuthService();

interface ISignUpPayLoad {
  username: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

interface ICreateNewPasswordPayLoad {
  token: string;
  newPassword: string;
}
