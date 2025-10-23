'use client';

import { Calendar1, EllipsisVertical } from 'lucide-react';
import { BasePopover } from '@/components/reuseable/base-popover';
import { OverlappingPfps } from '@/components/shared/overlapping-pfps';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { months } from '@/lib/constants';
import { getProgressPercentage } from '@/lib/date';
import { cn } from '@/lib/utils';
import type { IGoalCardProps } from '@/types';
import { InfoBadge } from '../../shared/info-badge';

export function GoalsCard({
  category,
  title,
  description,
  createdAt,
  dueDate,
  team,
}: Omit<IGoalCardProps, 'status'>) {
  return (
    <div className='flex flex-col gap-6 py-[18px] px-4 rounded-xl bg-white'>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <p
            style={{ color: categoryColors[category] }}
            className='text-sm font-bold leading-[160%] capitalize'
          >
            {category}
          </p>

          <BasePopover trigger={<PopoverTrigger />}>
            <div className='flex flex-col gap-1'>
              {[
                {
                  className: 'text-grey-800 hover:bg-grey-50',
                  name: 'View',
                  action: () => console.log('View goal.'),
                },
                {
                  className: 'text-grey-800 hover:bg-grey-50',
                  name: 'Edit',
                  action: () => console.log('Edit goal.'),
                },
                {
                  className: 'text-red-600 hover:bg-red-50 hover:text-red-700',
                  name: 'Delete',
                  action: () => console.log('Delete goal.'),
                },
              ].map((item) => (
                <Button
                  key={item.name}
                  variant='ghost'
                  onClick={item.action}
                  className={cn(
                    'justify-start w-full px-3 py-2 text-sm rounded-md',
                    item.className,
                  )}
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </BasePopover>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='md:text-lg font-bold leading-[140%] text-grey-900'>{title}</p>
          <p className='text-xs leading-[160%] text-grey-500'>{description}</p>
        </div>
      </div>

      <Progress
        value={getProgressPercentage(createdAt, dueDate, new Date())}
        indicatorStyle={{ backgroundColor: categoryColors[category] }}
      />

      <div className='w-full flex items-center justify-between'>
        <InfoBadge
          icon={Calendar1}
          info={`${months[dueDate.getMonth()].slice(0, 3)} - ${months[createdAt.getMonth()].slice(0, 3)} ${createdAt.getDate()}`}
        />

        <OverlappingPfps
          className='size-8 !w-8'
          margin='-ml-3'
          maxVisible={2}
          avatars={team}
        />
      </div>
    </div>
  );
}

function PopoverTrigger() {
  return (
    <Button
      variant='ghost'
      className='size-5 text-grey-500'
    >
      <EllipsisVertical strokeWidth={1.5} />
    </Button>
  );
}

const categoryColors: Record<IGoalCardProps['category'], string> = {
  sales: 'var(--color-primary-600)',
  marketing: 'var(--color-amber-500)',
  engineering: 'var(--color-sky)',
  seo: 'var(--color-glamour-pink-500)',
};
