export interface IUpdateAvatarPayload {
  avatarUrl: string;
}

export interface IUpdateAvatarResponse {
  message: string;
  data: {
    avatarUrl: string;
  };
}

export interface IUpdatePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export interface IUpdateUsernamePayload {
  username: string;
}
