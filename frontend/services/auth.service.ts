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
    const res = await api.post('/auth/sign-up', payload);
    return res.data;
  }

  async signIn(payload: ISignInPayLoad): Promise<ISignInResponse> {
    const res = await api.post('/auth/sign-in', payload);
    return res.data;
  }

  async signOut(): Promise<IApiResponse> {
    const res = await api.delete('/auth/sign-out');
    return res.data;
  }

  async verfifyEmail(payload: IVerifyEmailPayload): Promise<IApiResponse> {
    const res = await api.post('/auth/verify-email', payload);
    return res.data;
  }

  async resetPassword(payload: IResetPasswordPayload): Promise<IApiResponse> {
    const res = await api.post('/auth/reset-password', payload);
    return res.data;
  }

  async createNewPassword(payload: ICreateNewPasswordPayLoad): Promise<IApiResponse> {
    const res = await api.post('/auth/create-new-password', payload);
    return res.data;
  }

  async refreshToken(payload: IRefreshTokenPayload): Promise<IRefreshTokenResponse> {
    const res = await api.post('/auth/refresh', payload);
    return res.data;
  }

  async currentUser(): Promise<ICurrentUserResponse> {
    const res = await api.get('/auth/me');
    return res.data;
  }
}

export const authService = new AuthService();
