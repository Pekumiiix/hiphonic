'use client';

import { Calendar1 } from 'lucide-react';
import { useState } from 'react';
import { OverlappingPfps } from '@/components/shared/overlapping-pfps';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { months } from '@/lib/constants';
import { getProgressPercentage } from '@/lib/date';
import type { IGoalCardProps } from '@/types';
import { DetailsDialog } from '../../shared/app-dialog/details-dialog';
import { InfoBadge } from '../../shared/info-badge';

export function GoalsCard({
  category,
  title,
  description,
  createdAt,
  dueDate,
  team,
}: Omit<IGoalCardProps, 'status'>) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className='flex flex-col gap-6 py-[18px] px-4 rounded-xl bg-white border-none'
      >
        <div className='flex flex-col gap-4'>
          <p
            style={{ color: goalCategoryColors[category] }}
            className='text-sm font-bold leading-[160%] capitalize'
          >
            {category}
          </p>

          <CardHeader className='flex flex-col gap-2 px-0'>
            <CardTitle className='md:text-lg font-bold leading-[140%] text-grey-900'>
              {title}
            </CardTitle>
            <CardDescription className='text-xs leading-[160%] text-grey-500'>
              {description}
            </CardDescription>
          </CardHeader>
        </div>

        <Progress
          value={getProgressPercentage(createdAt, dueDate, new Date())}
          indicatorStyle={{ backgroundColor: goalCategoryColors[category] }}
        />

        <CardFooter className='w-full flex items-center justify-between p-0'>
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
        </CardFooter>
      </Card>

      <DetailsDialog
        open={open}
        setOpen={setOpen}
        isTask={false}
      />
    </>
  );
}

export const goalCategoryColors: Record<IGoalCardProps['category'], string> = {
  sales: 'var(--color-primary-600)',
  marketing: 'var(--color-amber-500)',
  engineering: 'var(--color-sky)',
  seo: 'var(--color-glamour-pink-500)',
};
