'use client';

import { ChevronRight, CircleCheckBig } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { BaseCheckbox } from '@/components/reuseable/base-checkbox';
import { OverlappingPfps } from '@/components/shared/overlapping-pfps';
import { QueryStateHandler } from '@/components/shared/query-state-handler';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { truncateSentence } from '@/utils/truncate';
import { DetailsDialog } from '../../shared/app-dialog/details-dialog';
import { DashboardPopoverWrapper } from '../components/dashboard-popover-wrapper';
import { EmptyState } from '../components/empty-state';
import { ErrorState } from '../components/error-state';
import { LoadingState } from '../components/loading-state';

export default function TodaysTasks() {
  const isLoading = false;
  const isError = false;
  const isEmpty = false;

  return (
    <div className='col-span-2 flex flex-col gap-3'>
      <div className='flex items-center justify-between'>
        <p className='font-bold text-grey-900 leading-[160%]'>Today&apos;s Tasks</p>

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

      <QueryStateHandler
        isLoading={isLoading}
        isError={isError}
        isEmpty={isEmpty}
        loading={<InnerLoadingState />}
        error={<InnerErrorState />}
        empty={<InnerEmptyState />}
      >
        <TaskListItem />
        <TaskListItem />
      </QueryStateHandler>
    </div>
  );
}

function TaskListItem() {
  const [open, setOpen] = useState(false);

  return (
    <div className='flex items-center justify-between px-4 py-[17px] rouded-xl bg-white rounded-xl'>
      <div className='flex items-center gap-3'>
        <BaseCheckbox id='task' />
        <p className='text-sm font-semibold leading-[160%] tracking-[0.2px] text-grey-900'>
          {truncateSentence('Create userflow for Hisphonic Application Design', 48)}
        </p>
      </div>

      <div className='flex flex-col items-end gap-4 md:gap-0'>
        <div className='flex items-center gap-3 md:gap-6'>
          <BadgeWrapper status='pending' />

          <TeamMembersAvatars
            team={[
              { username: 'OU', src: 'https://github.com/shadcn.png' },
              { username: 'TU', src: 'https://github.com/shadcn.png' },
              { username: 'RU', src: 'https://github.com/shadcn.png' },
              { username: 'YU', src: 'https://github.com/shadcn.png' },
              { username: 'UU', src: 'https://github.com/shadcn.png' },
              { username: 'PU', src: 'https://github.com/shadcn.png' },
            ]}
          />

          <DashboardPopoverWrapper>
            <Button
              onClick={() => setOpen(true)}
              variant='ghost'
              className='justify-start w-full'
            >
              View
            </Button>
          </DashboardPopoverWrapper>

          <DetailsDialog
            open={open}
            setOpen={setOpen}
            isTask
          />
        </div>

        <TeamMembersAvatars
          variant='mobile'
          team={[
            { username: 'OU', src: 'https://github.com/shadcn.png' },
            { username: 'TU', src: 'https://github.com/shadcn.png' },
            { username: 'RU', src: 'https://github.com/shadcn.png' },
            { username: 'YU', src: 'https://github.com/shadcn.png' },
            { username: 'UU', src: 'https://github.com/shadcn.png' },
            { username: 'PU', src: 'https://github.com/shadcn.png' },
          ]}
        />
      </div>
    </div>
  );
}

function BadgeWrapper({ status }: { status: 'pending' | 'in review' | 'completed' }) {
  return (
    <Badge
      className={cn(
        'h-[26px] px-3 py-2 rounded-full text-[10px] font-medium leading-[160%] capitalize',
        {
          'text-green-500 bg-green-50': status === 'completed',
          'text-amber-500 bg-amber-50': status === 'pending' || status === 'in review',
        },
      )}
    >
      {status}
    </Badge>
  );
}

function TeamMembersAvatars({ team, variant = 'default' }: ITeamMemberAvatars) {
  return (
    <OverlappingPfps
      maxVisible={2}
      className={cn('hidden md:flex size-6 !w-6', {
        'hidden md:flex': variant === 'default',
        'flex md:hidden': variant === 'mobile',
      })}
      margin='-ml-2'
      avatars={team}
    />
  );
}

function InnerLoadingState() {
  return (
    <LoadingState
      message='tasks'
      className='h-[120px]'
    />
  );
}

function InnerErrorState() {
  return (
    <ErrorState
      message='task'
      onRetry={() => console.log('Retry')}
      className='h-[120px]'
    />
  );
}

function InnerEmptyState() {
  return (
    <>
      <EmptyState
        icon={CircleCheckBig}
        title='No tasks due today'
        description="You're all caught up! There are no tasks due today. Check back later or add new tasks with today's due date to stay on track."
      />
    </>
  );
}

interface ITeamMemberAvatars {
  team: { username: string; src: string }[];
  variant?: 'mobile' | 'default';
}
