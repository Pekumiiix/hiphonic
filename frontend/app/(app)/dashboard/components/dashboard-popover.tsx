'use client';

import type { UrlObject } from 'node:url';
import { Ellipsis } from 'lucide-react';
import type { Route } from 'next';
import Link from 'next/link';
import { BasePopover } from '@/components/reuseable/base-popover';
import { Button } from '@/components/ui/button';

export function DashboardPopover({ href, action }: IDashboardPopover) {
  return (
    <BasePopover
      className='size-5'
      trigger={
        <Ellipsis
          size={16}
          color='#64748B'
        />
      }
    >
      <Button
        variant='ghost'
        asChild
        className='justify-start w-full'
      >
        <Link href={href}>View</Link>
      </Button>
      <Button
        onClick={action}
        variant='ghost'
        className='justify-start w-full'
      >
        Edit
      </Button>
    </BasePopover>
  );
}

interface IDashboardPopover {
  href: Route | UrlObject;
  action: () => void;
}
