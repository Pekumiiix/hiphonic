'use client';

import {
  LayoutDashboard,
  type LucideIcon,
  MessageCircleMore,
  Plus,
  SquareCheck,
  Trophy,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';

export default function DashboardSidebar() {
  return (
    <Sidebar
      side='left'
      collapsible='none'
      className='max-w-[250px] h-screen sticky top-0 py-8 px-4 bg-white shadow-[10px_10px_50px_0px_#64748B0A]'
    >
      <SidebarHeader className='flex flex-row items-center gap-[9px] px-4'>
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

      <SidebarSeparator className='mt-[27px] mb-8 border-grey-100' />

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
      <SidebarFooter />
    </Sidebar>
  );
}

function CustomSidebarGroup({
  title,
  data,
  action,
}: {
  title: string;
  data: IMenuLinkProps;
  action?: () => void;
}) {
  return (
    <SidebarGroup title={title}>
      <div className='flex items-center justify-between'>
        <SidebarGroupLabel className='px-4 text-xs font-bold leading-[160%] text-grey-400 tracking-[1px]'>
          {title}
        </SidebarGroupLabel>

        {action && (
          <SidebarGroupAction onClick={action}>
            <Plus
              size={16}
              color='#64748B'
            />
          </SidebarGroupAction>
        )}
      </div>
      <SidebarGroupContent>
        <SidebarMenu>
          {data.links.map((link) => (
            <MenuLink
              key={link.title}
              title={link.title}
              href={link.href}
              Icon={link?.icon}
              activeClassName={data.activeClassName}
              inActiveClassName={data.inActiveClassName}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

function MenuLink({
  title,
  href,
  Icon,
  activeClassName = 'font-bold text-primary-600 bg-grey-50 hover:bg-grey-50',
  inActiveClassName,
}: {
  title: string;
  href: string;
  Icon?: LucideIcon;
  activeClassName?: string;
  inActiveClassName?: string;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <SidebarMenuItem title={title}>
      <SidebarMenuButton
        asChild
        className={cn(
          'w-full h-12 px-4 flex items-center gap-4 rounded-[12px] leading-[160%] text-sm hover:text-primary-600 transition-colors duration-200',
          isActive ? activeClassName : inActiveClassName,
        )}
      >
        <Link href={href}>
          {Icon ? <Icon size={22} /> : <div className='size-3 bg-[#6366F1] rounded-full' />}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
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
      title: 'Messages',
      icon: MessageCircleMore,
      href: '/messages',
    },
    {
      title: 'Achievements',
      icon: Trophy,
      href: '/achievements',
    },
  ],
};

const projects: IMenuLinkProps = {
  inActiveClassName: 'font-semibold text-grey-900 tracking-[0.2px] bg-transparent',
  links: [
    { title: 'Website Design', href: '/projects/website-design' },
    { title: 'SEO Analytics', href: '/projects/seo-analytics' },
    { title: 'Hiphonic App', href: '/projects/hiphonic-app' },
  ],
};

interface IMenuLinkProps {
  activeClassName?: string;
  inActiveClassName?: string;
  links: {
    title: string;
    icon?: LucideIcon;
    href: string;
  }[];
}
