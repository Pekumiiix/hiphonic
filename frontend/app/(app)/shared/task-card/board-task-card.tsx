'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import type { ITaskCardProps } from '@/types';
import { TaskDetailsDialog } from '../task-dialog/view-task';
import {
  TaskCardDetails,
  TaskDescription,
  TaskDetailsSkeleton,
  TaskTitle,
} from './components/task-card-details';

export function BoardTaskCard({
  image,
  title,
  category,
  description,
  comment,
  due_date,
}: ITaskCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className='w-full py-[18px] px-4 flex flex-col gap-4 rounded-xl bg-white border-none'
      >
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col gap-3'>
            {image && (
              <Image
                src={image}
                alt={title}
                width={232}
                height={125}
                className='rounded-xl'
              />
            )}

            <TaskTitle
              title={title}
              category={category}
            />
          </div>

          {!image && <TaskDescription description={description} />}
        </div>

        <Separator className='w-full border-grey-100' />

        <TaskCardDetails
          variant='grid'
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
        mode='view'
      />
    </>
  );
}

export function BoardTaskCardSkeleton() {
  return (
    <div className='w-full py-[18px] px-4 flex flex-col gap-4 rounded-xl bg-white'>
      <div className='flex flex-col gap-1'>
        <Skeleton className='!h-4 w-2/5' />
        <Skeleton className='!h-3 w-2/5' />
      </div>

      <div className='flex flex-col gap-1'>
        <Skeleton className='!h-3 w-full' />
        <Skeleton className='!h-3 w-full' />
      </div>

      <Separator className='w-full border-grey-100' />

      <TaskDetailsSkeleton variant='grid' />
    </div>
  );
}
