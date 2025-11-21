'use client';

import { Funnel, LayoutGrid, List, type LucideIcon, Plus } from 'lucide-react';
import type React from 'react';
import { useState } from 'react';
import { BaseUISelect } from '@/components/reuseable/base-ui-select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CreateDialog } from '../app-dialog/create-dialog';

export function TaskContentWrapper({ children, className }: IProjectContentWrapper) {
  const [display, setDisplay] = useState<TDisplay>('list');
  const [activeTab, setActiveTab] = useState<Triggers>('to-do');

  return (
    <div className='w-full h-full flex flex-col px-4 max-md:gap-6 md:px-0'>
      <div
        className={cn(
          'w-full flex items-center justify-between p-2 md:px-8 md:py-4 bg-white border-grey-100 max-md:rounded-[10px]',
          className,
        )}
      >
        <div className='flex gap-2'>
          <ActionButtons
            Icon={List}
            text='List'
            isActive={display === 'list'}
            action={() => setDisplay('list')}
          />
          <ActionButtons
            Icon={LayoutGrid}
            text='Board'
            isActive={display === 'board'}
            action={() => setDisplay('board')}
          />
        </div>

        <ActionButtons
          Icon={Funnel}
          text='Filter'
          action={() => console.log('You clicked me.')}
        />
      </div>

      <div className='w-full flex flex-col gap-4'>
        {display === 'list' && (
          <div className='w-full flex flex-row md:items-center justify-between md:mt-[25px] md:px-8 lg:hidden'>
            <ListTabNav
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <MobileListNavSelect
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />

            <CreateDialog type='task'>
              <Button
                variant='ghost'
                size='icon'
                className='size-6 text-grey-400'
              >
                <Plus size={14} />
              </Button>
            </CreateDialog>
          </div>
        )}

        <div
          className={cn('w-full flex gap-6 overflow-x-scroll scrollbar-none max-md:pb-4', {
            'flex-col md:flex-row md:p-8': display === 'board',
            'flex-col md:px-8 lg:py-8': display === 'list',
          })}
        >
          {children(display, activeTab)}
        </div>
      </div>
    </div>
  );
}

function MobileListNavSelect({ activeTab, setActiveTab }: INavProps) {
  const handleChange = (value: string) => {
    setActiveTab(value as Triggers);
  };

  return (
    <BaseUISelect
      classNames={{
        trigger: 'w-fit h-[42px] bg-white border-none rounded-[8px] py-2 px-3 md:hidden',
      }}
      value={activeTab}
      onValueChange={(value) => handleChange(value as string)}
      group={[
        {
          label: 'Task status',
          item: [
            { value: 'to-do', label: 'To Do' },
            { value: 'in-progress', label: 'In Progress' },
            { value: 'in-review', label: 'In Review' },
            { value: 'done', label: 'Done' },
          ],
        },
      ]}
    />
  );
}

function ListTabNav({ activeTab, setActiveTab }: INavProps) {
  return (
    <div className='flex gap-6 max-md:hidden'>
      {[
        { name: 'To Do', action: () => setActiveTab('to-do'), isActive: activeTab === 'to-do' },
        {
          name: 'In Progress',
          action: () => setActiveTab('in-progress'),
          isActive: activeTab === 'in-progress',
        },
        {
          name: 'In Review',
          action: () => setActiveTab('in-review'),
          isActive: activeTab === 'in-review',
        },
        { name: 'Done', action: () => setActiveTab('done'), isActive: activeTab === 'done' },
      ].map((item) => (
        <TriggerButton
          key={item.name}
          name={item.name}
          action={item.action}
          isActive={item.isActive}
        />
      ))}
    </div>
  );
}

function ActionButtons({ Icon, text, isActive = false, action }: IToggleButtonProps) {
  return (
    <Button
      variant='ghost'
      onClick={action}
      className={cn(
        'h-10 w-fit rounded-[8px] py-2 px-3 flex items-center gap-2 text-sm font-medium leading-[160%] hover:bg-primary-50',
        {
          'text-grey-500': !isActive,
          'text-primary-600 hover:text-primary-600 bg-primary-50': isActive,
        },
      )}
    >
      <Icon
        size={20}
        className='text-inherit'
      />{' '}
      <span>{text}</span>
    </Button>
  );
}

function TriggerButton({ name, action, isActive }: ITriggerButtonProps) {
  return (
    <Button
      onClick={action}
      variant='ghost'
      className={cn('rounded-[8px] px-3 py-2 font-bold text-grey-900', {
        'bg-white hover:bg-white/80 hover:text-grey-900': isActive,
        'bg-transparent hover:bg-grey-50 hover:text-grey-900': !isActive,
      })}
    >
      {name}
    </Button>
  );
}

type TDisplay = 'list' | 'board';
type Triggers = 'to-do' | 'in-progress' | 'in-review' | 'done';

interface IProjectContentWrapper {
  children: (display: TDisplay, activeTab: Triggers) => React.ReactNode;
  className?: string;
}

interface IToggleButtonProps {
  isActive?: boolean;
  Icon: LucideIcon;
  text: string;
  action: () => void;
}

interface ITriggerButtonProps {
  name: string;
  action: () => void;
  isActive: boolean;
}

interface INavProps {
  activeTab: Triggers;
  setActiveTab: (activeTab: Triggers) => void;
}
