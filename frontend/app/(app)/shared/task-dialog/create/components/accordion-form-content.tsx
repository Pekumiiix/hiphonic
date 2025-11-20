import { Plus } from 'lucide-react';
import type { UseFormReturn } from 'react-hook-form';
import { BaseAvatar } from '@/components/reuseable/base-avatar';
import { BaseDatePicker } from '@/components/reuseable/base-date-picker';
import { BaseUISelect } from '@/components/reuseable/base-ui-select';
import { OverlappingPfps } from '@/components/shared/overlapping-pfps';
import { TaskCategoryTag } from '../../../task-category-tag';
import { RenderTaskDate } from '../../components/task-dialog-components';
import type { TaskSchema } from '../schema';
import { CreateTaskFormField } from './create-task-form-field';
import { CreateTaskPlaceholder } from './create-task-placeholder';

export function AccordionFormContent({ form }: { form: UseFormReturn<TaskSchema> }) {
  return (
    <div className='w-full grid grid-cols-2 gap-x-2 gap-y-5 md:flex items-start justify-between md:gap-0'>
      <CreateTaskFormField
        form={form}
        name='assignee'
        label='assigned to'
      >
        {(field) => (
          <AsigneeSelect
            value={field.value}
            onValueChange={field.onChange}
          />
        )}
      </CreateTaskFormField>

      <div className='flex flex-col gap-3 -mt-1'>
        <p className='text-sm font-medium text-grey-400'>CREATED</p>

        <RenderTaskDate date={new Date()} />
      </div>

      <CreateTaskFormField
        form={form}
        name='category'
        label='category'
      >
        {(field) => (
          <BaseUISelect
            placeholder='Category'
            classNames={{
              trigger: '!p-0 border-none shadow-none w-[100px] cursor-pointer z-0',
            }}
            value={field.value}
            onValueChange={field.onChange}
            icon={<></>}
            group={[{ label: 'Categories', item: categories }]}
          />
        )}
      </CreateTaskFormField>

      <CreateTaskFormField
        form={form}
        name='due_date'
        label='due date'
      >
        {(field) => (
          <BaseDatePicker
            {...field}
            placeholder={
              <CreateTaskPlaceholder
                image='/assets/dashboard/task/due-date.png'
                text='No due date'
              />
            }
            renderValue={(date) => <RenderTaskDate date={date} />}
            className='w-[130px] hover:bg-transparent px-0'
          />
        )}
      </CreateTaskFormField>
    </div>
  );
}

function AsigneeSelect({ value, onValueChange }: IAsigneeSelect) {
  function handleChange(value: string[]) {
    console.log(value);
    onValueChange?.(value);
  }

  return (
    <BaseUISelect
      multiple
      value={value}
      icon={<></>}
      placeholder={
        <CreateTaskPlaceholder
          image='/assets/dashboard/task/asignee.png'
          text='No asignee'
        />
      }
      renderValue={(val) => <RenderAssignValue val={val} />}
      onValueChange={(val) => handleChange(val as string[])}
      classNames={{
        trigger: 'p-0 rounded-[2px] border-none shadow-none w-full',
        content: 'bg-white',
      }}
      group={[
        {
          item: [{ label: <AsigneeSelectItem />, value: 'me' }],
        },
      ]}
    />
  );
}

function AsigneeSelectItem() {
  return (
    <div className='flex items-center gap-3'>
      <BaseAvatar
        username='OU'
        avatar='https://github.com/shadcn.png'
      />
      <p className='text-sm font-medium leading-[160%] text-grey-500'>Pelumi Amao</p>
    </div>
  );
}

function RenderAssignValue({ val }: { val: { label: React.ReactNode; value: string }[] }) {
  return (
    <div className='flex items-center'>
      {val.map((item) => (
        <OverlappingPfps
          key={item.value}
          maxVisible={3}
          avatars={[{ username: 'Pelumi', src: '' }]}
          className='size-10'
        />
      ))}

      <div className='flex items-center justify-center size-10 -ml-3 z-50 rounded-full border-2 border-white bg-grey-50'>
        <Plus size={20} />
      </div>
    </div>
  );
}

const categories: { label: React.ReactNode; value: string }[] = [
  { label: <TaskCategoryTag category='development' />, value: 'development' },
  { label: <TaskCategoryTag category='design' />, value: 'design' },
  { label: <TaskCategoryTag category='planning' />, value: 'planning' },
];

interface IAsigneeSelect {
  value: string[];
  onValueChange?: (value: string[]) => void;
}
