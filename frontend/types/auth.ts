export interface IUser {
  id: string;
  email: string;
  username: string;
  avatarUrl: string | null;
}

export interface ISignUpPayLoad {
  username: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

export interface ICreateNewPasswordPayLoad {
  token: string;
  newPassword: string;
}

export interface ISignInPayLoad {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface ISignInResponse {
  type: string;
  token: string;
  expiresAt?: string;
  rememberMe: boolean;
  user: IUser;
}

export interface IRefreshTokenPayload {
  extendRememberMe?: boolean;
}

export interface IRefreshTokenResponse {
  type: string;
  token?: string;
  expiresAt?: string;
  refreshed: boolean;
}

export interface ICurrentUserResponse {
  user: IUser;
  token: {
    name?: string;
    expiresAt?: string;
    lastUsedAt?: string;
    isExpired?: boolean;
  };
}

export interface IVerifyEmailPayload {
  token: string;
}

export interface IResetPasswordPayload {
  email: string;
}
