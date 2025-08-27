'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { LoadingFallback } from '@/components/shared/loading-fallback';
import { useSearchParams } from '@/hooks/use-search-params';

export default function AuthCallbackPage() {
  const router = useRouter();
  const { get } = useSearchParams();

  useEffect(() => {
    const token = get('token');
    const error = get('error');

    if (error) {
      router.push(`/sign-in?error=${error}`);
      return;
    }

    if (token) {
      localStorage.setItem('auth_token', token);
      router.push('/dashboard');
    } else {
      router.push('/sign-in');
    }
  }, [router, get]);

  return <LoadingFallback className='h-screen' />;
}
