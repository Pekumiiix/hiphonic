'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useVerifyEmail } from '@/hooks/use-auth';
import { useSearchParams } from '@/hooks/use-search-params';
import { AuthLogo } from '../components/auth-logo';
import { ResultState } from '../components/result-state';
import Loading from './loading';

export default function VerifyEmailPage() {
  const [errorMessage, setErrorMessage] = useState<string>('Something went wrong.');
  const [success, setSuccess] = useState<boolean | null>(null);

  const verifyEmailMutation = useVerifyEmail();

  const { mutate, isPending } = verifyEmailMutation;

  const { get } = useSearchParams();

  const token = get('token');

  const router = useRouter();

  useEffect(() => {
    if (!token || token === undefined) {
      router.push('/sign-in');
      return;
    }

    mutate(
      { token: token },
      {
        onSuccess: () => {
          setSuccess(true);
        },
        onError: (data) => {
          setErrorMessage(data.message);
          setSuccess(false);
        },
      },
    );
  }, [router, token, mutate]);

  if (success === null) {
    return (
      <div className='w-full h-full flex flex-col'>
        <AuthLogo />
        <Loading />
      </div>
    );
  }

  return (
    <div className='w-full h-full flex flex-col'>
      <AuthLogo />
      <ResultState
        image={success ? '/assets/auth/check.gif' : '/assets/auth/error.gif'}
        name={success ? 'Email has been verified successfully, procced to sign in.' : errorMessage}
        alt={success ? 'Checkmark' : 'Error'}
        isLoading={isPending}
      />
    </div>
  );
}
