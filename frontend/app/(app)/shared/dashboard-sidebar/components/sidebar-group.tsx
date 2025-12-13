import { Plus } from 'lucide-react';
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import type { IMenuLinkProps } from '..';
import { MenuLink } from './sidebar-menu-link';

export function CustomSidebarGroup({ title, data, action }: ICustomSidebarGroup) {
  return (
    <SidebarGroup title={title}>
      <div className='flex items-center justify-between'>
        <SidebarGroupLabel className='px-4 text-xs font-bold leading-[160%] text-grey-400 tracking-[1px]'>
          {title}
        </SidebarGroupLabel>

        {action && (
          <SidebarGroupAction
            title='New project'
            onClick={action}
          >
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
              inActiveClassName={data.inActiveClassName}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

interface ICustomSidebarGroup {
  title: string;
  data: IMenuLinkProps;
  action?: () => void;
}
