'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { LoadingFallback } from '@/components/shared/loading-fallback';
import { useAuth } from '@/provider/auth-provider';

const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings', '/admin'] as const;

export function AuthHeaderProvider({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();

  const isProtectedRoute = useMemo(() => {
    return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
  }, [pathname]);

  useEffect(() => {
    if (isProtectedRoute && !isLoading && !isAuthenticated) {
      const redirectUrl = `/sign-in?redirect=${encodeURIComponent(pathname)}`;
      window.location.href = redirectUrl;
    }
  }, [isProtectedRoute, isLoading, isAuthenticated, pathname]);

  if (isLoading) {
    return <LoadingFallback className='h-screen' />;
  }

  if (isProtectedRoute && !isAuthenticated) {
    return <LoadingFallback className='h-screen' />;
  }

  return <>{children}</>;
}
