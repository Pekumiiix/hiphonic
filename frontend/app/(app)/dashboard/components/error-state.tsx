import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ErrorState({ message, onRetry, className }: ErrorStateProps) {
  return (
    <div
      className={cn(
        'w-full self-center flex flex-col gap-3 items-center justify-center',
        className,
      )}
      data-testid='error-state'
    >
      <AlertCircle
        size={28}
        className='text-rose-500'
      />

      <p className='text-sm text-grey-700 font-medium mx-3 text-center'>Failed to get {message}</p>

      <Button
        variant='outline'
        size='sm'
        onClick={onRetry}
        data-testid='retry-btn'
      >
        Retry
      </Button>
    </div>
  );
}

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
  className?: string;
}
