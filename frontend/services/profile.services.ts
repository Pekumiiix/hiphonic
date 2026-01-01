import { apiRequest } from '@/lib/api-request';
import type { IApiResponse } from '@/types/api';
import type {
  IUpdateAvatarPayload,
  IUpdateAvatarResponse,
  IUpdatePasswordPayload,
  IUpdateUsernamePayload,
} from '@/types/profile';

class ProfileService {
  async updateAvatar(payload: IUpdateAvatarPayload) {
    return apiRequest<IUpdateAvatarResponse, IUpdateAvatarPayload>(
      'patch',
      '/profile/avatar',
      payload,
    );
  }

  async updatePassword(payload: IUpdatePasswordPayload) {
    return apiRequest<IApiResponse, IUpdatePasswordPayload>('patch', '/profile/password', payload);
  }

  async updateUsername(payload: IUpdateUsernamePayload) {
    return apiRequest<IApiResponse, IUpdateUsernamePayload>('patch', '/profile/username', payload);
  }
}

export const profileService = new ProfileService();
