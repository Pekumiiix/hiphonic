'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import type { ITaskCardProps } from '@/types';
import { TaskDetailsDialog } from '../task-dialog/task-details-dialog';
import {
  TaskCardDetails,
  TaskDescription,
  TaskDetailsSkeleton,
  TaskTitle,
} from './task-card-components';

export function ListTaskCard({
  title,
  category,
  description,
  due_date,
  comment,
}: Omit<ITaskCardProps, 'image'>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className='flex flex-col max-md:gap-3 md:flex-row md:items-center justify-between p-4 bg-white rounded-xl'
      >
        <TaskTitle
          title={title}
          category={category}
        />

        <TaskDescription
          className='md:hidden lg:flex max-w-[232px]'
          description={description}
        />

        <Separator className='w-full border-grey-100 md:hidden' />

        <TaskCardDetails
          variant='list'
          due_date={due_date}
          comment={comment}
          avatars={[
            { username: 'OU', src: 'https://github.com/shadcn.png' },
            { username: 'TU', src: 'https://github.com/shadcn.png' },
            { username: 'RU', src: 'https://github.com/shadcn.png' },
            { username: 'YU', src: 'https://github.com/shadcn.png' },
            { username: 'UU', src: 'https://github.com/shadcn.png' },
            { username: 'PU', src: 'https://github.com/shadcn.png' },
          ]}
        />
      </Card>

      <TaskDetailsDialog
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}

export function ListTaskCardSkeleton() {
  return (
    <div className='flex flex-col max-md:gap-3 md:flex-row md:items-center justify-between p-4 bg-white rounded-xl'>
      <div className='w-[70px] flex flex-col gap-1'>
        <Skeleton className='!h-4 w-full' />
        <Skeleton className='!h-3 w-full' />
      </div>

      <div className='w-[120px] lg:w-[232px] flex flex-col gap-1'>
        <Skeleton className='!h-3' />
        <Skeleton className='!h-3' />
      </div>

      <TaskDetailsSkeleton variant='list' />
    </div>
  );
}
