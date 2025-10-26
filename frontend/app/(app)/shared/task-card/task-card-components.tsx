import { Calendar1, MessageCircleMore } from 'lucide-react';
import { OverlappingPfps } from '@/components/shared/overlapping-pfps';
import { CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import type { ITaskCardProps, TCategory } from '@/types';
import { truncateSentence } from '@/utils/truncate';
import { InfoBadge } from '../info-badge';

export function TaskTitle({ title, category }: Pick<ITaskCardProps, 'title' | 'category'>) {
  return (
    <CardHeader className='flex flex-col gap-1 p-0 m-0'>
      <CardTitle className='min-w-[140px] font-semibold text-grey-900 leading-[150%]'>
        {title}
      </CardTitle>

      <TaskCategoryTag category={category} />
    </CardHeader>
  );
}

export function TaskDescription({ description, className }: ITaskDescription) {
  return (
    <CardDescription className={cn('text-xs text-grey-500', className)}>
      {truncateSentence(description, 66)}
    </CardDescription>
  );
}

export function TaskCategoryTag({ category }: { category: TCategory }) {
  return (
    <div className='flex items-center gap-1'>
      <span
        className='size-[6px] rounded-full'
        style={{ background: categoryColor[category] }}
      />
      <p
        className='text-xs font-medium text-inherit capitalize'
        style={{ color: categoryColor[category] }}
      >
        {category}
      </p>
    </div>
  );
}

export function TaskCardDetails({ due_date, comment, variant, avatars }: ITaskDetails) {
  return (
    <CardFooter
      className={cn('flex items-center p-0 m-0', {
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
    </CardFooter>
  );
}

export function TaskDetailsSkeleton({ variant }: { variant: ITaskDetails['variant'] }) {
  return (
    <div
      className={cn('flex items-center', {
        'max-md:justify-between md:gap-5 lg:gap-16': variant === 'list',
        'justify-between': variant === 'grid',
      })}
    >
      <div className='flex gap-2'>
        <Skeleton className='!h-8 w-[77px]' />
        <Skeleton className='!h-8 w-11' />
      </div>

      <Skeleton className='!h-8 w-8 rounded-full' />
    </div>
  );
}

const categoryColor: Record<TCategory, string> = {
  development: '#38BDF8',
  design: '#2563EB',
  planning: '#34D399',
};

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
