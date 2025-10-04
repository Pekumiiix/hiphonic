import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { globalToasts } from '@/lib/toasts';
import { authService } from '@/services/auth.service';
import type {
  ICreateNewPasswordPayLoad,
  IRefreshTokenPayload,
  IResetPasswordPayload,
  ISignInPayLoad,
  ISignUpPayLoad,
  IVerifyEmailPayload,
} from '@/types/auth';

export function useSignUp() {
  return useMutation({
    mutationFn: (payload: ISignUpPayLoad) => authService.signUp(payload),
  });
}

export function useSignIn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ISignInPayLoad) => authService.signIn(payload),
    onSuccess: (data) => {
      const storage =
        typeof window !== 'undefined' ? (data.rememberMe ? localStorage : sessionStorage) : null;

      if (storage) {
        storage.setItem('auth_token', data.token);
        storage.setItem('remember_me', (data.rememberMe ?? false).toString());
        if (data.expiresAt) {
          storage.setItem('token_expires_at', data.expiresAt);
        }
      }

      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: IResetPasswordPayload) => authService.resetPassword(payload),
  });
}

export function useRefreshToken() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IRefreshTokenPayload) => authService.refreshToken(payload),
    onSuccess: (data) => {
      const rememberMe =
        typeof window !== 'undefined'
          ? localStorage.getItem('remember_me') === 'true' ||
            sessionStorage.getItem('remember_me') === 'true'
          : false;

      const storage =
        typeof window !== 'undefined' ? (rememberMe ? localStorage : sessionStorage) : null;

      if (storage) {
        storage.setItem('auth_token', data.token || '');
        if (data.expiresAt) {
          storage.setItem('token_expires_at', data.expiresAt);
        }
      }

      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: () => authService.currentUser(),
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (payload: IVerifyEmailPayload) => authService.verfifyEmail(payload),
  });
}

export function useCreateNewPassword() {
  return useMutation({
    mutationFn: (payload: ICreateNewPasswordPayLoad) => authService.createNewPassword(payload),
    onSuccess: (data) => {
      globalToasts.globalSuccess(data.message);
    },
    onError: () => {
      globalToasts.globalError('Failed to update password. Try again.');
    },
  });
}
