'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthLogo } from '../components/auth-logo';
import { ResultState } from '../components/result-state';

export default function VerifyEmailPage() {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const searchParam = useSearchParams();
  const token = searchParam.get('token');

  useEffect(() => {
    if (!token || token === undefined) {
      router.push('/sign-in');
      return;
    }

    const verify = async () => {
      setIsLoading(true);

      try {
        const res = await fetch('/api/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const result = await res.json();

        if (res.ok) {
          setSuccess(true);
        } else {
          setError(result.message);
        }
      } catch (err) {
        console.log(err);
        setError('Something went wrong.');
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, [router, token]);

  return (
    <div className='w-full h-full flex flex-col'>
      <AuthLogo />
      <ResultState
        image={success ? '/assets/auth/successful.gif' : '/assets/auth/error.gif'}
        name={success ? 'Successfully verified email, procced to sign in.' : error}
        alt={success ? 'Checkmark' : 'Error'}
        isLoading={isLoading}
        showButton={success}
      />
    </div>
  );
}
