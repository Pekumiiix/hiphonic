'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Error({ error, reset }: IError) {
  return (
    <div className='h-screen flex flex-col items-center justify-center px-4'>
      <div className='flex flex-col items-center gap-6 bg-white p-8 rounded-lg shadow-md max-w-md w-full border border-grey-200'>
        <span className='bg-red-50 p-3 rounded-full mb-1'>
          <AlertTriangle
            className='text-red-500'
            size={36}
            strokeWidth={1.5}
          />
        </span>
        <h1 className='text-2xl font-semibold text-grey-900 text-center'>
          Oops! Something went wrong.
        </h1>
        <p className='text-base text-grey-500 text-center'>
          An unexpected error occurred. Please try refreshing the page, or contact support if the
          problem continues.
        </p>
        <Button
          className='mt-2 w-full'
          onClick={() => reset()}
          variant='default'
        >
          Try again
        </Button>

        {process.env.NODE_ENV === 'development' && (
          <pre className='mt-4 text-xs text-red-400 bg-red-50 rounded p-2 w-full overflow-x-auto'>
            {error?.message}
            {error?.digest && <div>Digest: {error.digest}</div>}
          </pre>
        )}
      </div>
    </div>
  );
}

interface IError {
  error: Error & { digest?: string };
  reset: () => void;
}
