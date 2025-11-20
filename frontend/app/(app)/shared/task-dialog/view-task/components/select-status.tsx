'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { BaseUISelect } from '@/components/reuseable/base-ui-select';

export function SelectStatus() {
  const [value, setValue] = useState<TStatus>('');

  return (
    <BaseUISelect
      placeholder='Status'
      value={value}
      onValueChange={(val) => setValue(val as TStatus)}
      triggerStyle={{ backgroundColor: selectBackground[value] }}
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

const selectBackground: Record<TStatus, string> = {
  'in-progress': '#2563EB',
  'in-review': '#F6A723',
  done: '#24d164',
  '': '#0f172a',
};

const statusItem: IStatusItem[] = [
  { value: 'in-review', label: 'In review' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'done', label: 'Done' },
];

type TStatus = '' | 'in-progress' | 'in-review' | 'done';

interface IStatusItem {
  value: TStatus;
  label: string;
}
