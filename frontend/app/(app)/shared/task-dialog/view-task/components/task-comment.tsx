import { Clock4 } from 'lucide-react';
import { BaseAvatar } from '@/components/reuseable/base-avatar';

export function TaskComment() {
  return (
    <div className='flex gap-4'>
      <BaseAvatar
        username='Pelumi'
        classNames={{ image: 'size-8' }}
      />

      <div className='flex flex-col gap-2'>
        <div className='flex items-center gap-4'>
          <p className='text-sm font-bold leading-[160%] text-grey-900'>Andre Voleavaou</p>
          <div className='flex items-center gap-1 text-xs font-medium text-grey-400'>
            <Clock4 size={16} />
            <p className='leading-[160%]'>10 hours ago</p>
          </div>
        </div>

        <p className='text-xs leading-[160%] text-grey-500'>
          Almost there @Angela, can you see the comments in Figma now!
        </p>
      </div>
    </div>
  );
}
