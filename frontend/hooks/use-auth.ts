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
    onSuccess: () => {
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.signOut(),
    onSuccess: () => {
      queryClient.setQueryData(['currentUser'], null);
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
