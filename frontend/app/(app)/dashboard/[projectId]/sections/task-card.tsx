import { Calendar1, MessageCircleMore } from 'lucide-react';
import Image from 'next/image';
import { InfoBadge } from '@/app/(app)/shared/info-badge';
import { OverlappingPfps } from '@/components/shared/overlapping-pfps';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { ITaskCardProps } from '@/types';
import { truncateSentence } from '@/utils/truncate';
import { CategoryBlock } from '../component/category-block';

export function GridTaskCard({
  image,
  title,
  category,
  description,
  comment,
  due_date,
}: ITaskCardProps) {
  return (
    <div className='w-full py-[18px] px-4 flex flex-col gap-4 rounded-xl bg-white'>
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

      <TaskDetails
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
    </div>
  );
}

export function ListTaskCard({
  title,
  category,
  description,
  due_date,
  comment,
}: Omit<ITaskCardProps, 'image'>) {
  return (
    <div className='flex flex-col max-md:gap-3 md:flex-row md:items-center justify-between p-4 bg-white rounded-xl'>
      <TaskTitle
        title={title}
        category={category}
      />

      <TaskDescription
        className='md:hidden lg:flex max-w-[232px]'
        description={description}
      />

      <Separator className='w-full border-grey-100 md:hidden' />

      <TaskDetails
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
    </div>
  );
}

function TaskTitle({ title, category }: Pick<ITaskCardProps, 'title' | 'category'>) {
  return (
    <div className='flex flex-col gap-1'>
      <p className='font-semibold text-grey-900 leading-[150%]'>{title}</p>

      <CategoryBlock category={category} />
    </div>
  );
}

function TaskDescription({ description, className }: ITaskDescription) {
  return (
    <p className={cn('text-xs text-grey-500', className)}>{truncateSentence(description, 66)}</p>
  );
}

function TaskDetails({ due_date, comment, variant, avatars }: ITaskDetails) {
  return (
    <div
      className={cn('flex items-center', {
        'max-md:justify-between md:gap-[60px] lg:gap-16': variant === 'list',
        'justify-between': variant === 'grid',
      })}
    >
      <div className='flex gap-2'>
        <InfoBadge
          icon={Calendar1}
          info={due_date}
        />
        <InfoBadge
          icon={MessageCircleMore}
          info={String(comment)}
        />
      </div>

      <OverlappingPfps
        className='size-8 !w-8'
        margin='-ml-3'
        maxVisible={2}
        avatars={avatars}
      />
    </div>
  );
}

interface ITaskDescription {
  description: string;
  className?: string;
}

interface ITaskDetails {
  due_date: string;
  comment: number;
  variant: 'list' | 'grid';
  avatars: { username: string; src: string }[];
}
