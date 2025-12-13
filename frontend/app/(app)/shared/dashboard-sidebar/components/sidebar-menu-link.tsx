import type { LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import type { TRoute } from '@/types';

export function MenuLink({ title, href, Icon, inActiveClassName }: IMenuLink) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <SidebarMenuItem title={title}>
      <SidebarMenuButton
        asChild
        className={cn(
          'w-full h-12 px-4 flex items-center gap-4 rounded-[12px] leading-[160%] text-sm hover:text-primary-600 transition-colors duration-200',
          isActive ? 'font-bold text-primary-600 bg-grey-50 hover:bg-grey-50' : inActiveClassName,
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

interface IMenuLink {
  title: string;
  href: TRoute;
  Icon?: LucideIcon;
  inActiveClassName?: string;
}
