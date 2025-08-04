'use client';

import Image from 'next/image';
import { useAuth } from '@/components/custom/auth-provider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function DashboardNav() {
  const { user } = useAuth();

  return (
    <div className='w-full flex items-center justify-between px-4 md:px-8 py-[23px] bg-white border-l-2 border-grey-50'>
      <div className='flex items-center gap-2.5'>
        <p className='hidden md:flex text-2xl font-bold text-grey-900 leading-[125%] traking-[0.2px]'>
          Dashboard
        </p>

        <div className='flex md:hidden items-center gap-2'>
          <Image
            src='/assets/logo.png'
            alt='Logo'
            width={23}
            height={23}
          />
          <p className='text-grey-900 font-bold text-xl leading-[125%] -tracking-[0.29px]'>
            Hiphonic
          </p>
        </div>
      </div>

      <div className='flex items-center gap-3'>
        <Avatar className='max-md:hidden'>
          <AvatarImage
            src='https://github.com/shadcn.png'
            className='size-10 rounded-full'
          />
          <AvatarFallback> {user ? user.username : 'Guest'}</AvatarFallback>
        </Avatar>

        <p className='max-md:hidden text-sm font-bold leading-[160%] text-grey-900 capitalize'>
          {user ? user.username : 'Guest'}
        </p>

        <SidebarTrigger className='md:hidden' />
      </div>
    </div>
  );
}
