import { BadgeCheck, CircleX } from 'lucide-react';
import { toast } from 'sonner';

export const globalToasts = {
  globalError: (message: string) =>
    toast.error(message, {
      position: 'top-right',
      duration: 6000,
      icon: <CircleX size={14} />,
      style: { backgroundColor: '#FFE6EA' },
    }),
  globalSuccess: (message: string) =>
    toast.success(message, {
      position: 'top-right',
      duration: 6000,
      icon: <BadgeCheck size={14} />,
      style: { backgroundColor: '#E6FFE6' },
    }),
};
