import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function TaskSummary() {
  return (
    <div className='flex flex-col gap-5 p-5 rounded-xl bg-white -mt-[115px]'>
      <p className='font-bold text-grey-900 leading-[150%]'>Task Summary</p>

      <div className='grid grid-cols-3 gap-3'>
        <SummaryCards
          className='border-white bg-primary-600 text-white'
          name='Projects'
          value={12}
          src='/assets/dashboard/projects.png'
        />
        <SummaryCards
          className='border-white bg-sky text-white'
          name='Assigned'
          value={79}
          src='/assets/dashboard/assigned.png'
        />
        <SummaryCards
          className='border-grey-300 bg-grey-50 text-grey-900'
          name='Closed'
          value={79}
          src='/assets/dashboard/check.png'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <p className='text-xs text-grey-500 leading-[160%]'>On-time Completion Rate</p>
        <div className='flex items-end gap-2'>
          <p className='text-2xl text-grey-900 font-bold leading-[125%] tracking-[0.2px]'>92%</p>
          <p className='text-xs font-medium leading-[160%] text-algal-500'>+2.5%</p>
        </div>
      </div>
    </div>
  );
}

function SummaryCards({ className, name, value, src }: ISummaryCardProps) {
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

      <div className='flex flex-col items-center text-inherit'>
        <p className='text-xs leading-[160%] text-inherit'>{name}</p>
        <p className='font-bold leading-[150%] text-inherit'>{value}</p>
      </div>
    </div>
  );
}

interface ISummaryCardProps {
  className: string;
  name: string;
  value: number;
  src: string;
}
