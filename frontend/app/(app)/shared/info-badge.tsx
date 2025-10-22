import type { LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function InfoBadge({ info, icon, variant = 'default' }: InfoBadgeProps) {
  const Icon = icon;

  return (
    <Badge
      variant={variant}
      className='w-fit h-8 flex gap-1 p-2 rounded-[8px]'
    >
      <Icon size={16} />
      {info}
    </Badge>
  );
}

interface InfoBadgeProps {
  info: string;
  icon: LucideIcon;
  variant?: 'default' | 'destructive';
}
