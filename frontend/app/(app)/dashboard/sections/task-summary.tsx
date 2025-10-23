import Image from 'next/image';
import { QueryStateHandler } from '@/components/shared/query-state-handler';
import { cn } from '@/lib/utils';
import { ErrorState } from '../components/error-state';
import { LoadingState } from '../components/loading-state';

export default function TaskSummary() {
  const isLoading = false;
  const isError = false;

  return (
    <div className='col-span-2 xl:col-span-1 h-fit flex flex-col gap-5 p-4 md:p-5 rounded-xl bg-white'>
      <p className='font-bold text-grey-900 leading-[150%]'>Task Summary</p>

      <QueryStateHandler
        isLoading={isLoading}
        isError={isError}
        loading={<InnerLoadingState />}
        error={<InnerErrorState />}
      >
        <SummaryContainer />
      </QueryStateHandler>
    </div>
  );
}

function SummaryContainer() {
  return (
    <div className='w-full flex flex-col lg:flex-row lg:items-end xl:items-start xl:flex-col gap-5'>
      <div className='w-full grid md:flex xl:grid grid-cols-3 gap-6 xl:gap-3'>
        <SummaryCards
          className='border-white bg-primary-600 text-white max-w-[144px] max-xl:justify-center'
          name='Projects'
          value={12}
          src='/assets/dashboard/projects.png'
          isSpecial={false}
        />

        <div className='grid md:flex flex-col gap-4 w-full col-span-2 xl:w-full xl:grid grid-cols-2 xl:gap-3'>
          <SummaryCards
            className='border-white bg-sky text-white flex-col md:flex-row xl:flex-col'
            name='Assigned'
            value={79}
            src='/assets/dashboard/assigned.png'
          />
          <SummaryCards
            className='border-grey-300 bg-grey-50 text-grey-900 flex-col md:flex-row xl:flex-col'
            name='Closed'
            value={79}
            src='/assets/dashboard/check.png'
          />
        </div>
      </div>

      <div className='min-w-fit flex flex-col gap-2'>
        <p className='text-xs text-grey-500 leading-[160%]'>On-time Completion Rate</p>
        <div className='flex items-end gap-2'>
          <p className='text-2xl text-grey-900 font-bold leading-[125%] tracking-[0.2px]'>92%</p>
          <p className='text-xs font-medium leading-[160%] text-algal-500'>+2.5%</p>
        </div>
      </div>
    </div>
  );
}

function SummaryCards({ className, name, value, src, isSpecial = true }: ISummaryCardProps) {
  return (
    <div
      className={cn(
        'w-full flex flex-col gap-[13px] items-center rounded-xl py-4 px-[21px]',
        className,
      )}
    >
      <div className='size-10 flex items-center justify-center rounded-full border border-inherit'>
        <Image
          src={src}
          alt={name}
          width={20}
          height={20}
        />
      </div>

      <div
        className={cn('flex flex-col text-inherit', {
          'items-center': !isSpecial,
          'max-md:items-center xl:items-center': isSpecial,
        })}
      >
        <p className='text-xs leading-[160%] text-inherit'>{name}</p>
        <p className='font-bold leading-[150%] text-inherit'>{value}</p>
      </div>
    </div>
  );
}

function InnerLoadingState() {
  return (
    <LoadingState
      message='task summary'
      className='h-[206px]'
    />
  );
}

function InnerErrorState() {
  return (
    <ErrorState
      message='task summary'
      onRetry={() => console.log('Retry')}
      className='h-[206px]'
    />
  );
}

interface ISummaryCardProps {
  className: string;
  name: string;
  value: number;
  src: string;
  isSpecial?: boolean;
}
