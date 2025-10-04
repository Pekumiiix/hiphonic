'use client';

import { createContext, type ReactNode, useContext, useMemo } from 'react';
import { useCurrentUser, useRefreshToken, useSignIn, useSignOut } from '@/hooks/use-auth';
import type { AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const signIn = useSignIn();
  const signout = useSignOut();
  const refreshToken = useRefreshToken();

  const { data: user, isLoading } = useCurrentUser();

  const token =
    typeof window !== 'undefined'
      ? localStorage.getItem('auth_token') || sessionStorage.getItem('auth_token')
      : null;

  const value: AuthContextType = useMemo(
    () => ({
      user: user?.user ?? null,
      token,
      isLoading: isLoading || signIn.isPending || signout.isPending || refreshToken.isPending,
      signIn,
      signOut: async () => signout.mutateAsync(),
      refreshToken: async (extendRememberMe = false) =>
        refreshToken.mutateAsync({ extendRememberMe }),
      isAuthenticated: !!user?.user && !!token,
    }),
    [user, token, isLoading, signIn, signout, refreshToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
