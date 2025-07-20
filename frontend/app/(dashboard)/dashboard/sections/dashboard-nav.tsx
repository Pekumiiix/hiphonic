'use client';

import { useAuth } from '@/components/custom/auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function DashboardNav() {
  const { user } = useAuth();

  return (
    <div className='w-full flex items-center justify-between px-8 py-[23px] bg-white border-l-2 border-grey-50'>
      <p className='text-2xl font-bold text-grey-900 leading-[125%] traking-[0.2px]'>Dashboard</p>

      <div className='flex items-center gap-3'>
        <Avatar>
          <AvatarImage
            src='https://github.com/shadcn.png'
            className='size-10 rounded-full'
          />
          <AvatarFallback> {user ? user.username : 'Guest'}</AvatarFallback>
        </Avatar>

        <p className='text-sm font-bold leading-[160%] text-grey-900 capitalize'>
          {user ? user.username : 'Guest'}
        </p>
      </div>
    </div>
  );
}
