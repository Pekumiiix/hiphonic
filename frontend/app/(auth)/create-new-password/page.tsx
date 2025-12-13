'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSearchParams } from '@/hooks/use-search-params';
import CreateNewPasswordForm from './sections/create-password-form';

export default function CreateNewPasswordPage() {
  const { get } = useSearchParams();

  const token = get('token');
  const router = useRouter();

  useEffect(() => {
    if (!token || token === undefined) {
      router.push('/sign-in');
    }
  }, [router, token]);

  if (!token) {
    return null;
  }

  return <CreateNewPasswordForm token={token} />;
}
