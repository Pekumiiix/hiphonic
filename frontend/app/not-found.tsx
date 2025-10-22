import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className='h-screen flex flex-col items-center justify-center px-4'>
      <div className='flex flex-col items-center gap-6 bg-white p-8 rounded-lg shadow-md max-w-md w-full border border-grey-200'>
        <span className='bg-grey-100 p-3 rounded-full mb-1'>
          <AlertTriangle
            className='text-grey-500'
            size={38}
            strokeWidth={1.5}
          />
        </span>
        <h1 className='text-2xl font-semibold text-grey-900 text-center'>Project Not Found</h1>
        <p className='text-base text-grey-500 text-center'>
          The project you&apos;re looking for does not exist or has been deleted.
        </p>
        <Button
          asChild
          className='w-full max-w-xs mt-2 text-base font-medium rounded-md'
        >
          <Link href='/dashboard'>Back to Dashboard</Link>
        </Button>
      </div>
    </div>
  );
}
