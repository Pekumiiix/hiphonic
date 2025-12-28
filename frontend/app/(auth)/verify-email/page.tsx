'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { QueryStateHandler } from '@/components/shared/query-state-handler';
import { useVerifyEmail } from '@/hooks/use-auth';
import { useSearchParams } from '@/hooks/use-search-params';
import { AuthLogo } from '../shared/auth-logo';
import { ResultState } from '../shared/result-state';
import Loading from './loading';

export default function VerifyEmailPage() {
  const { mutate, isPending, isError, error } = useVerifyEmail();

  const { get } = useSearchParams();

  const token = get('token');

  const router = useRouter();

  useEffect(() => {
    if (!token || token === undefined) {
      router.replace('/sign-in');
      return;
    }

    mutate({ token: token });
  }, [router, token, mutate]);

  return (
    <QueryStateHandler
      isLoading={isPending}
      isError={isError}
      loading={<LoadingState />}
      error={
        <ErrorState
          error={error}
          isPending={isPending}
        />
      }
    >
      <div className='w-full h-full flex flex-col'>
        <AuthLogo />
        <ResultState
          image='/assets/auth/check.gif'
          name='Email has been verified successfully, procced to sign in.'
          alt='Checkmark'
          isLoading={isPending}
        />
      </div>
    </QueryStateHandler>
  );
}

function LoadingState() {
  return (
    <div className='w-full h-full flex flex-col'>
      <AuthLogo />
      <Loading />
    </div>
  );
}

function ErrorState({ error, isPending }: IErrorState) {
  return (
    <div className='w-full h-full flex flex-col'>
      <AuthLogo />
      <ResultState
        image='/assets/auth/error.gif'
        name={error?.message || 'Something went wrong'}
        alt='Error'
        isLoading={isPending}
      />
    </div>
  );
}

interface IErrorState {
  error: Error | null;
  isPending: boolean;
}
