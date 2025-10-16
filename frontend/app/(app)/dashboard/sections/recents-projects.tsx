'use client';

import { SquareCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { DashboardPopover } from '../components/dashboard-popover';

export default function RecentProjects() {
  return (
    <div className='w-full col-span-2 h-fit flex flex-col gap-4 p-4 md:py-6 md:px-5 rounded-xl bg-white'>
      <p className='font-bold text-grey-900'>Recents Projects</p>

      <Separator className='bg-grey-100' />

      <div className='flex flex-col md:grid grid-cols-3 gap-4'>
        <RecentCards />
        <RecentCards />
        <RecentCards />
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

          <DashboardPopover
            href='#'
            action={() => console.log('Hello world')}
          />
        </div>

        <div className='flex flex-col gap-[9px]'>
          <div className='w-full flex items-center justify-between'>
            <p className='text-xs text-grey-500'>Progress</p>
            <p className='text-xs text-grey-900 font-semibold'>55%</p>
          </div>

          <Progress
            value={55}
            indicatorColor='bg-primary-600'
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
