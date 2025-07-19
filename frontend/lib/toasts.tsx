import { BadgeCheck, CircleX } from 'lucide-react';
import { toast } from 'sonner';

export const globalToasts = {
  globalError: (message: string) =>
    toast.error(message, {
      position: 'top-right',
      duration: 6000,
      icon: <CircleX size={14} />,
      style: { backgroundColor: '#FF00001A' },
    }),
  globalSuccess: (message: string) =>
    toast.success(message, {
      position: 'top-right',
      duration: 6000,
      icon: <BadgeCheck size={14} />,
      style: { backgroundColor: '#dbeafe' },
    }),
};
