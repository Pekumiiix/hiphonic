import { BadgeCheck, CircleCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ToastComponent({ variant, message }: IToastComponentProps) {
  return (
    <div
      className={cn('flex items-center gap-1.5 text-sm font-medium', {
        'text-primary-600': variant === 'success',
        'text-red-600': variant === 'error',
      })}
    >
      {variant === 'success' ? <BadgeCheck size={14} /> : <CircleCheck size={14} />}
      <p>{message}</p>
    </div>
  );
}

interface IToastComponentProps {
  variant: 'success' | 'error';
  message: string;
}
