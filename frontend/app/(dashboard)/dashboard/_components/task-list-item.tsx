'use client';

import { Ellipsis } from 'lucide-react';
import { BaseCheckbox } from '@/components/reuseable/base-checkbox';
import { BasePopover } from '@/components/reuseable/base-popover';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export default function TaskListItem() {
  return (
    <div className='flex items-center justify-between px-4 py-[17px] rouded-xl bg-white rounded-xl'>
      <div className='flex items-center gap-3'>
        <BaseCheckbox id='task' />
        <p className='text-sm font-semibold leading-[160%] tracking-[0.2px] text-grey-900'>
          Create userflow for Hisphonic Application Design
        </p>
      </div>

      <div className='flex items-center gap-6'>
        <RenderBadge status='pending' />
        <BasePopover
          className='size-5'
          trigger={
            <Ellipsis
              size={16}
              color='#64748B'
            />
          }
        >
          <Button variant='ghost'>View</Button>
          <Button variant='ghost'>Edit</Button>
        </BasePopover>
      </div>
    </div>
  );
}

function RenderBadge({ status }: { status: 'pending' | 'in review' | 'completed' }) {
  if (status === 'pending' || status === 'in review') {
    return (
      <Badge className='px-3 py-2 rounded-full bg-amber-50 text-[10px] font-medium leading-[160%] text-amber-500 capitalize'>
        {status}
      </Badge>
    );
  }

  if (status === 'completed') {
    return (
      <Badge className='px-3 py-2 rounded-full bg-amber-50 text-[10px] font-medium leading-[160%] text-amber-500'>
        Completed
      </Badge>
    );
  }

  return null;
}
