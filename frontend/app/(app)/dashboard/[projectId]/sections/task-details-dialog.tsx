'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { BaseAccordion } from '@/components/reuseable/base-accordion';
import { BaseUISelect } from '@/components/reuseable/base-ui-select';
import { OverlappingPfps } from '@/components/shared/overlapping-pfps';
import { Button } from '@/components/ui/button';
import { CategoryBlock } from '../component/category-block';
import { RenderTaskDate } from '../component/render-task-date';
import { TaskDialogWrapper } from '../component/task-dialog-wrapper';

export function TaskDetailsDialog() {
  return (
    <TaskDialogWrapper
      trigger={
        <Button
          variant='ghost'
          className='size-6 text-grey-400'
        >
          View
        </Button>
      }
      title='View Task Details'
      description='View and manage all details related to this task.'
      space='Hiphonic'
    >
      <div className='w-full flex flex-col gap-8 px-6 pb-10'>
        <div className='w-full flex items-center justify-between'>
          <p className='text-[22px] text-grey-900 font-bold leading-[125%]'>Automated Goals</p>

          <SelectStatus />
        </div>

        <BaseAccordion
          collapsible
          type='single'
          defaultValue='details'
          items={[{ value: 'details', trigger: 'Details', content: <AccordionContent /> }]}
          classNames={{
            item: 'rounded-xl border border-grey-100',
            trigger:
              'text-xs font-bold text-grey-900 px-4 py-2.5 border-grey-100 data-[state=open]:border-b',
            content: 'min-h-fit p-2',
          }}
        />

        <div className='flex flex-col gap-[7px]'>
          <p className='text-grey-900 text-sm font-semibold leading-[160%]'>Description</p>
          <p className='text-xs leading-[160%] text-grey-500'>
            Analytics delivers actionable, industry-ready initiatives each time a business complete
            their full account. Phasellus vitae amet amet, mauris faucibus at sit. Pellentesque
            rhoncus adipiscing a enim, quis tortor, non etiam. Eget faucibus mattis consequat dui
            imperdiet scelerisque. Lorem placerat blandit ut lobortis volutpat convallis libero. Sed
            imperdiet dignissim ipsum quam.
          </p>
        </div>
      </div>
    </TaskDialogWrapper>
  );
}

function SelectStatus() {
  const [value, setValue] = useState<TStatus>('');

  return (
    <BaseUISelect
      placeholder='Status'
      value={value}
      onValueChange={(val) => setValue(val as TStatus)}
      triggerStyle={{ backgroundColor: RenderSelectBackground(value) }}
      group={[
        {
          label: 'Status',
          item: statusItem,
        },
      ]}
      icon={
        <ChevronDown
          color='#ffffff'
          size={16}
        />
      }
      classNames={{
        trigger: `w-fit h-8 rounded-[8px] p-2 pl-3 text-xs text-white leading-[160%] font-bold bg-[#F6A723] border-none transition-colors duration-300`,
      }}
    />
  );
}

function AccordionContent() {
  return (
    <div className='w-full grid grid-cols-2 gap-x-2 gap-y-5 md:flex items-start justify-between md:gap-0'>
      <AccordionContentBlocks text='ASSIGNED TO'>
        <OverlappingPfps
          maxVisible={3}
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
        <CategoryBlock category='development' />
      </AccordionContentBlocks>

      <AccordionContentBlocks text='DUE DATE'>
        <RenderTaskDate date={new Date()} />
      </AccordionContentBlocks>
    </div>
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

function RenderSelectBackground(name: TStatus) {
  if (name === 'in-progress') {
    return '#2563EB';
  }
  if (name === 'in-review') {
    return '#F6A723';
  }
  if (name === 'done') {
    return '#24d164';
  }
  return '#0f172a';
}

const statusItem: IStatusItem[] = [
  { value: 'in-review', label: 'In review' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

type TStatus = '' | 'in-progress' | 'in-review' | 'done';

interface IAccordionContentBlocks {
  children: React.ReactNode;
  text: string;
}

interface IStatusItem {
  value: TStatus;
  label: string;
}
