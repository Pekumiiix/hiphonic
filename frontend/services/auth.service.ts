import { apiRequest } from '@/lib/api-request';
import type { IApiResponse } from '@/types/api';
import type {
  ICreateNewPasswordPayLoad,
  ICurrentUserResponse,
  IRefreshTokenPayload,
  IResetPasswordPayload,
  ISignInPayLoad,
  ISignInResponse,
  ISignUpPayLoad,
  IVerifyEmailPayload,
} from '@/types/auth';
import api from './http.service';

class AuthService {
  async signUp(payload: ISignUpPayLoad) {
    return apiRequest<IApiResponse, ISignUpPayLoad>('post', '/auth/sign-up', payload);
  }

  async signIn(payload: ISignInPayLoad) {
    return apiRequest<ISignInResponse, ISignInPayLoad>('post', '/auth/sign-in', payload);
  }

  async signOut() {
    return apiRequest<IApiResponse>('post', '/auth/sign-out');
  }

  async verfifyEmail(payload: IVerifyEmailPayload) {
    return apiRequest<IApiResponse, IVerifyEmailPayload>('post', '/auth/verify-email', payload);
  }

  async resetPassword(payload: IResetPasswordPayload) {
    return apiRequest<IApiResponse, IResetPasswordPayload>('post', '/auth/reset-password', payload);
  }

  async createNewPassword(payload: ICreateNewPasswordPayLoad) {
    return apiRequest<IApiResponse, ICreateNewPasswordPayLoad>(
      'post',
      '/auth/create-new-password',
      payload,
    );
  }

  async refreshToken(payload: IRefreshTokenPayload) {
    return apiRequest<IApiResponse, IRefreshTokenPayload>('post', '/auth/refresh', payload);
  }

  async currentUser(): Promise<ICurrentUserResponse> {
    const res = await api.get('/auth/me');
    return res.data;
  }
}

export const authService = new AuthService();
