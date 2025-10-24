import { Ellipsis } from 'lucide-react';
import { BasePopover } from '@/components/reuseable/base-popover';

export function DashboardPopoverWrapper({ children }: IDashboardPopoverWrapper) {
  return (
    <BasePopover
      className='size-5'
      trigger={
        <Ellipsis
          size={16}
          color='#64748B'
        />
      }
    >
      {children}
    </BasePopover>
  );
}

interface IDashboardPopoverWrapper {
  children: React.ReactNode;
}
