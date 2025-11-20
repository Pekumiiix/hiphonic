import { LogOut } from 'lucide-react';
import { BaseAvatar } from '@/components/reuseable/base-avatar';
import { Button } from '@/components/ui/button';

export function TeamListItem() {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-2.5'>
        <BaseAvatar
          username='Pelumi Amao'
          avatar='https://github.com/shadcn.png'
        />
        <p className='text-sm font-medium text-grey-900'>Pelumi Amao</p>
      </div>

      <Button className='size-6 rounded-[5px] bg-transparent hover:bg-grey-200 shadow-none'>
        <LogOut className='text-grey-500' />
      </Button>
    </div>
  );
}
