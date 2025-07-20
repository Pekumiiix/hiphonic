import type { UseMutationResult } from '@tanstack/react-query';

export interface User {
  id: number;
  email: string;
  username: string | null;
}

export interface AuthToken {
  name?: string;
  expiresAt?: string;
  lastUsedAt?: string;
  isExpired?: boolean;
}

export interface SignInResponse {
  type: string;
  token: string;
  expiresAt?: string;
  rememberMe: boolean;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  signIn: UseMutationResult<
    SignInResponse,
    Error,
    { email: string; password: string; rememberMe?: boolean }
  >;
  signOut: () => Promise<void>;
  refreshToken: (extendRememberMe?: boolean) => Promise<void>;
  isAuthenticated: boolean;
}
