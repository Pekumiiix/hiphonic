import { LoaderCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export function LoadingFallback({ className }: { className?: string }) {
  return (
    <div className={cn('w-full flex items-center justify-center', className)}>
      <LoaderCircle
        size={100}
        color='#2563eb'
        className='animate-spin'
      />
    </div>
  );
}
