import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoadingState({ message, className }: ILoadingState) {
  return (
    <div
      className={cn('w-full h-[206px] flex flex-col gap-2 items-center justify-center', className)}
    >
      <LoaderCircle
        size={25}
        className='text-primary-600 animate-spin'
      />
      <p className='text-sm text-grey-500 font-medium animate-pulse'>Getting {message}...</p>
    </div>
  );
}

interface ILoadingState {
  message: string;
  className?: string;
}
