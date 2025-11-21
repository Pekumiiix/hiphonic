'use client';

import { useState } from 'react';
import { BaseAvatar } from '@/components/reuseable/base-avatar';
import { OverlappingPfps } from '@/components/shared/overlapping-pfps';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TaskCategoryTag } from '../../../category-tag';
import { RenderTaskDate } from '../../components/app-dialog-components';
import { TeamDialog } from '../../team-dialog.tsx';

export function AccordionContent() {
  const [open, setOpen] = useState<boolean>(false);

  const isLoading = false;

  return (
    <>
      <div className='w-full grid grid-cols-2 gap-x-2 gap-y-5 md:flex items-start justify-between md:gap-0'>
        <AccordionContentBlocks text='ASSIGNED TO'>
          <OverlappingPfps
            maxVisible={3}
            onClick={() => setOpen(true)}
            className='size-8 !w-8'
            margin='-ml-3'
            avatars={[
              { username: 'OU', src: 'https://github.com/shadcn.png' },
              { username: 'TU', src: 'https://github.com/shadcn.png' },
              { username: 'RU', src: 'https://github.com/shadcn.png' },
              { username: 'YU', src: 'https://github.com/shadcn.png' },
              { username: 'UU', src: 'https://github.com/shadcn.png' },
              { username: 'PU', src: 'https://github.com/shadcn.png' },
            ]}
          />
        </AccordionContentBlocks>

        <AccordionContentBlocks text='CREATED AT'>
          <RenderTaskDate date={new Date()} />
        </AccordionContentBlocks>

        <AccordionContentBlocks text='CATEGORY'>
          <TaskCategoryTag category='development' />
        </AccordionContentBlocks>

        <AccordionContentBlocks text='DUE DATE'>
          <RenderTaskDate date={new Date()} />
        </AccordionContentBlocks>
      </div>

      <TeamDialog
        open={open}
        setOpen={setOpen}
      >
        <Button
          className={cn(
            'w-fit rounded-full text-black font-medium bg-transparent hover:bg-transparent',
            {
              'p-1 h-fit border border-primary-600 animate-pulse': isLoading,
              'p-0 h-fit': !isLoading,
            },
          )}
        >
          <BaseAvatar
            username='Pelumi Amao'
            avatar='https://github.com/shadcn.png'
          />
        </Button>
      </TeamDialog>
    </>
  );
}

function AccordionContentBlocks({ children, text }: IAccordionContentBlocks) {
  return (
    <div className='w-fit flex flex-col justify-between gap-3'>
      <p className='text-xs font-medium leading-[160%] tracking-[1px] text-grey-400'>{text}</p>
      {children}
    </div>
  );
}

interface IAccordionContentBlocks {
  children: React.ReactNode;
  text: string;
}
