'use client';

import { CircleAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className='flex flex-col items-center justify-center h-[60vh]'>
      <CircleAlert size={50} />
      <h2 className='text-lg font-semibold mb-2 text-gray-800'>Failed to load tasks</h2>
      <p className='text-gray-500 mb-4 text-center max-w-xs'>
        We couldn&lsquo;t fetch your tasks due to a network or server issue. Please try again or
        check your connection.
      </p>
      <Button
        className='inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition'
        onClick={onRetry}
      >
        Retry
      </Button>
    </div>
  );
}
