'use client';

import { Bell, LayoutDashboard, LogOut, type LucideIcon, SquareCheck, Trophy } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from '@/components/ui/sidebar';
import { useSignOut } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';
import type { TRoute } from '@/types';
import { CustomSidebarGroup } from './components/sidebar-group';

export default function DashboardSidebar() {
  const { isMobile } = useSidebar();

  const signOutMutation = useSignOut();
  const router = useRouter();

  function handleSignOut() {
    signOutMutation.mutate(undefined, {
      onSuccess: () => {
        router.replace('/sign-in');
      },
    });
  }

  return (
    <Sidebar
      side='left'
      collapsible={isMobile ? undefined : 'none'}
      className='max-w-[250px] h-screen sticky top-0 pb-4 px-4 bg-white shadow-[10px_10px_50px_0px_#64748B0A]'
    >
      <SidebarHeader className='h-20 flex flex-row items-center gap-[9px] border-b border-grey-100'>
        <Image
          src='/assets/logo.png'
          alt='Logo'
          width={28}
          height={28}
        />
        <p className='text-grey-900 font-bold text-[23px] leading-[125%] -tracking-[0.29px]'>
          Hiphonic
        </p>
      </SidebarHeader>

      <SidebarContent className='w-full flex flex-col gap-6 p-0 scrollbar-none'>
        <CustomSidebarGroup
          title='Menu'
          data={menu_links}
        />

        <SidebarSeparator className='border-grey-100 !max-w-[90%]' />

        <CustomSidebarGroup
          title='Projects'
          data={projects}
          action={() => console.log('hello world!')}
        />
      </SidebarContent>
      <SidebarFooter className='list-none pt-2'>
        <SidebarMenuItem title='Sign out'>
          <SidebarMenuButton
            onClick={handleSignOut}
            className={cn(
              'w-full h-12 px-4 flex items-center gap-4 rounded-[12px] leading-[160%] font-semibold text-sm text-red-500 hover:text-red-700 transition-colors duration-200 hover:bg-red-50',
            )}
          >
            <LogOut size={22} />
            <span>{signOutMutation.isPending ? 'Signing out' : 'Sign out'}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarFooter>
    </Sidebar>
  );
}

const menu_links: IMenuLinkProps = {
  inActiveClassName: 'font-medium tracking-[0.2px] text-grey-500 bg-transparent',
  links: [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/dashboard',
    },
    {
      title: 'Tasks',
      icon: SquareCheck,
      href: '/tasks',
    },
    {
      title: 'Notifications',
      icon: Bell,
      href: '/notification',
    },
    {
      title: 'Goals',
      icon: Trophy,
      href: '/goals',
    },
  ],
};

const projects: IMenuLinkProps = {
  inActiveClassName: 'font-semibold text-grey-900 tracking-[0.2px] bg-transparent',
  links: [
    { title: 'Website Design', href: '#' },
    { title: 'SEO Analytics', href: '#' },
    { title: 'Hiphonic App', href: '#' },
  ],
};

export interface IMenuLinkProps {
  inActiveClassName?: string;
  links: {
    title: string;
    icon?: LucideIcon;
    href: TRoute;
  }[];
}
