import type { AxiosError } from 'axios';
import type { IApiResponse } from '@/types/api';
import type {
  ICreateNewPasswordPayLoad,
  ICurrentUserResponse,
  IRefreshTokenPayload,
  IRefreshTokenResponse,
  IResetPasswordPayload,
  ISignInPayLoad,
  ISignInResponse,
  ISignUpPayLoad,
  IVerifyEmailPayload,
} from '@/types/auth';
import api from './http.service';

class AuthService {
  async signUp(payload: ISignUpPayLoad): Promise<IApiResponse> {
    try {
      const res = await api.post('/auth/sign-up', payload);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw {
        message: err.response?.data?.message || err.message,
      };
    }
  }

  async signIn(payload: ISignInPayLoad): Promise<ISignInResponse> {
    try {
      const res = await api.post('/auth/sign-in', payload);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw {
        message: err.response?.data?.message || err.message,
      };
    }
  }

  async signOut(): Promise<IApiResponse> {
    try {
      const res = await api.delete('/auth/sign-out');
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw {
        message: err.response?.data?.message || err.message,
      };
    }
  }

  async verfifyEmail(payload: IVerifyEmailPayload): Promise<IApiResponse> {
    try {
      const res = await api.post('/auth/verify-email', payload);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw {
        message: err.response?.data?.message || err.message,
      };
    }
  }

  async resetPassword(payload: IResetPasswordPayload): Promise<IApiResponse> {
    try {
      const res = await api.post('/auth/reset-password', payload);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw {
        message: err.response?.data?.message || err.message,
      };
    }
  }

  async createNewPassword(payload: ICreateNewPasswordPayLoad): Promise<IApiResponse> {
    try {
      const res = await api.post('/auth/create-new-password', payload);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw {
        message: err.response?.data?.message || err.message,
      };
    }
  }

  async refreshToken(payload: IRefreshTokenPayload): Promise<IRefreshTokenResponse> {
    try {
      const res = await api.post('/auth/refresh', payload);
      return res.data;
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      throw {
        message: err.response?.data?.message || err.message,
      };
    }
  }

  async currentUser(): Promise<ICurrentUserResponse> {
    const res = await api.get('/auth/me');
    return res.data;
  }
}

export const authService = new AuthService();
