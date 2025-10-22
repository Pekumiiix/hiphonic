import { Calendar1, EllipsisVertical } from 'lucide-react';
import { OverlappingPfps } from '@/components/shared/overlapping-pfps';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { months } from '@/lib/constants';
import { getProgressPercentage } from '@/lib/date';
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

          <Button
            variant='ghost'
            className='size-5 text-grey-500'
          >
            <EllipsisVertical strokeWidth={1.5} />
          </Button>
        </div>
        <div className='flex flex-col gap-2'>
          <p className='text-lg font-bold leading-[140%] text-grey-900'>{title}</p>
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

const categoryColors: Record<IGoalCardProps['category'], string> = {
  sales: 'var(--color-primary-600)',
  marketing: 'var(--color-amber-500)',
  engineering: 'var(--color-sky)',
  seo: 'var(--color-glamour-pink-500)',
};
