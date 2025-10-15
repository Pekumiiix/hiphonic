'use client';

import { usePathname, useRouter } from 'next/navigation';
import { createContext, type ReactNode, useContext, useEffect, useMemo } from 'react';
import { LoadingFallback } from '@/components/shared/loading-fallback';
import { useCurrentUser, useRefreshToken, useSignIn, useSignOut } from '@/hooks/use-auth';
import type { AuthContextType } from '@/types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const signIn = useSignIn();
  const signout = useSignOut();
  const refreshToken = useRefreshToken();

  const router = useRouter();
  const pathname = usePathname();

  const { data: user, isLoading } = useCurrentUser();

  const isAuthenticated = !!user?.user;

  useEffect(() => {
    if (!isLoading && isAuthenticated && pathname === '/sign-in') {
      router.replace('/dashboard');
    }
  }, [isLoading, isAuthenticated, pathname, router]);

  const value: AuthContextType = useMemo(
    () => ({
      user: user?.user ?? null,
      isLoading: isLoading || signIn.isPending || signout.isPending || refreshToken.isPending,
      signIn,
      signOut: async () => signout.mutateAsync(),
      refreshToken: async (extendRememberMe = false) =>
        refreshToken.mutateAsync({ extendRememberMe }),
      isAuthenticated,
    }),
    [user, isLoading, signIn, signout, refreshToken, isAuthenticated],
  );

  if (isLoading || (isAuthenticated && pathname === '/sign-in')) {
    return <LoadingFallback className='h-screen' />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
