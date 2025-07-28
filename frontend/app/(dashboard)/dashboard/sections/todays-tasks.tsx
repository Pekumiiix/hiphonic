import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import TaskListItem from '../_components/task-list-item';

export default function TodaysTasks() {
  return (
    <div className='col-span-2 flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <p className='font-bold text-grey-900 leading-[160%]'>Task Today</p>

        <Button
          asChild
          variant='ghost'
          className='flex items-center gap-1 text-sm font-medium text-grey-500 leading-[160%] tracking-[0.2px] hover:bg-primary-50'
        >
          <Link href='/dashboard'>
            <span>See all</span>
            <ChevronRight size={16} />
          </Link>
        </Button>
      </div>

      <TaskListItem />
      <TaskListItem />
    </div>
  );
}
