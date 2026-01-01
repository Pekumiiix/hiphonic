import { useMutation } from '@tanstack/react-query';
import { globalToasts } from '@/lib/toasts';
import { profileService } from '@/services/profile.services';
import type {
  IUpdateAvatarPayload,
  IUpdatePasswordPayload,
  IUpdateUsernamePayload,
} from '@/types/profile';

export function useUpdateAvatar() {
  return useMutation({
    mutationFn: (payload: IUpdateAvatarPayload) => profileService.updateAvatar(payload),
    onSuccess: (data) => {
      globalToasts.globalSuccess(data.message);
    },
  });
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: (payload: IUpdatePasswordPayload) => profileService.updatePassword(payload),
    onSuccess: (data) => {
      globalToasts.globalSuccess(data.message);
    },
  });
}

export function useUpdateUsername() {
  return useMutation({
    mutationFn: (payload: IUpdateUsernamePayload) => profileService.updateUsername(payload),
    onSuccess: (data) => {
      globalToasts.globalSuccess(data.message);
    },
  });
}
