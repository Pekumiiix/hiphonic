'use client';

import { Clock, SquareCheck } from 'lucide-react';
import Link from 'next/link';
import { QueryStateHandler } from '@/components/shared/query-state-handler';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { DashboardPopoverWrapper } from '../components/dashboard-popover-wrapper';
import { EmptyState } from '../components/empty-state';
import { ErrorState } from '../components/error-state';

export default function RecentProjects() {
  const isLoading = false;
  const isError = false;
  const isEmpty = false;

  return (
    <div className='w-full col-span-2 h-fit flex flex-col gap-4 p-4 md:py-6 md:px-5 rounded-xl bg-white'>
      <p className='font-bold text-grey-900'>Recents Projects</p>

      <Separator className='bg-grey-100' />

      <div className='flex flex-col md:grid grid-cols-3 gap-4'>
        <QueryStateHandler
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          loading={<InnerLoadingState />}
          error={<InnerErrorState />}
          empty={<InnerEmptyState />}
        >
          <RecentCards />
          <RecentCards />
          <RecentCards />
        </QueryStateHandler>
      </div>
    </div>
  );
}

function RecentCards() {
  return (
    <div className='flex flex-col gap-[18px] bg-grey-50 rounded-xl p-4'>
      <div className='w-full flex flex-col gap-4'>
        <div className='w-full flex items-center justify-between'>
          <p className='font-bold text-grey-900'>Hiphonic</p>

          <DashboardPopoverWrapper>
            <Button
              variant='ghost'
              asChild
              className='justify-start w-full'
            >
              <Link href='#'>View</Link>
            </Button>
          </DashboardPopoverWrapper>
        </div>

        <div className='flex flex-col gap-[9px]'>
          <div className='w-full flex items-center justify-between'>
            <p className='text-xs text-grey-500'>Progress</p>
            <p className='text-xs text-grey-900 font-semibold'>55%</p>
          </div>

          <Progress
            value={55}
            className='[&_[data-slot=progress-indicator]]:bg-primary-600'
          />
        </div>
      </div>

      <div className='flex items-center gap-1'>
        <SquareCheck
          size={16}
          color='#64748B'
        />

        <p className='text-xs text-grey-500'>
          <span className='text-grey-800 font-medium'>8</span>/15
        </p>
      </div>
    </div>
  );
}

function InnerEmptyState() {
  return (
    <EmptyState
      icon={Clock}
      title='No recent projects'
      description="You haven't added any projects yet. Start a new project to track your progress and manage tasks efficiently."
    />
  );
}

function InnerLoadingState() {
  return Array.from({ length: 3 }).map((index) => (
    <Skeleton
      key={index + crypto.randomUUID()}
      className='w-full !h-[115px]'
    />
  ));
}

function InnerErrorState() {
  return (
    <ErrorState
      onRetry={() => console.log('Retry.')}
      message='recent projects'
      className='h-[115px] md:col-span-3'
    />
  );
}
