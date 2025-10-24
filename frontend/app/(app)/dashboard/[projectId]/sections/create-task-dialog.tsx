import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import {
  type ControllerRenderProps,
  type Path,
  type UseFormReturn,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';
import { TaskCategoryTag } from '@/app/(app)/shared/task/task-card-components';
import { BaseAccordion } from '@/components/reuseable/base-accordion';
import { BaseAvatar } from '@/components/reuseable/base-avatar';
import { BaseDatePicker } from '@/components/reuseable/base-date-picker';
import { FormBase, FormField } from '@/components/reuseable/base-form';
import { BaseUISelect } from '@/components/reuseable/base-ui-select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RenderTaskDate } from '../component/render-task-date';
import { TaskDialogWrapper } from '../component/task-dialog-wrapper';

const taskSchema = z.object({
  name: z.string(),
  assignee: z.array(z.string()),
  category: z.enum(['planning', 'development', 'design']),
  description: z.string(),
  due_date: z.date(),
});

export function CreateTaskDialog() {
  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      category: 'development',
    },
  });

  function onSubmit(data: TaskSchema) {
    console.log(data);
  }

  return (
    <TaskDialogWrapper
      trigger={
        <Button
          variant='ghost'
          size='icon'
          className='size-6 text-grey-400'
        >
          <Plus size={14} />
        </Button>
      }
      title='Create New Task'
      description='Fill out the form below to add a new task to your project.'
      space='Hiphonic'
    >
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='w-full px-4 md:px-6 pb-6 flex flex-col gap-8'
      >
        <CustomFormField
          form={form}
          name='name'
        >
          {(field) => (
            <Input
              {...field}
              placeholder='Write a task name'
              className='w-full p-0 border-transparent placeholder:font-bold placeholder:leading-[22px] placeholder:text-grey-400 shadow-none focus-visible:ring-0 focus-visible:border-0'
            />
          )}
        </CustomFormField>

        <BaseAccordion
          collapsible
          type='single'
          defaultValue='details'
          items={[
            { value: 'details', trigger: 'Details', content: <AccordionFormContent form={form} /> },
          ]}
          classNames={{
            item: 'rounded-xl border border-grey-100',
            trigger:
              'text-xs font-bold text-grey-900 px-4 py-2.5 border-grey-100 data-[state=open]:border-b',
            content: 'min-h-fit p-2',
          }}
        />

        <FormField
          form={form}
          name='description'
          label='Description'
          className='w-full'
        >
          {(field) => (
            <Textarea
              {...field}
              placeholder='Add more details to this task'
              className='w-full border-none shadow-none focus-visible:border-none focus-visible:ring-0 p-0 rounded-none'
            />
          )}
        </FormField>

        <Button className='self-end w-fit h-12'>Create task</Button>
      </FormBase>
    </TaskDialogWrapper>
  );
}

function AccordionFormContent({ form }: { form: ICustomFieldProps['form'] }) {
  return (
    <div className='w-full grid grid-cols-2 gap-x-2 gap-y-5 md:flex items-start justify-between md:gap-0'>
      <CustomFormField
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
      </CustomFormField>

      <div className='flex flex-col gap-3 -mt-1'>
        <p className='text-sm font-medium text-grey-400'>CREATED</p>

        <RenderTaskDate date={new Date()} />
      </div>

      <CustomFormField
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
      </CustomFormField>

      <CustomFormField
        form={form}
        name='due_date'
        label='due date'
      >
        {(field) => (
          <BaseDatePicker
            {...field}
            placeholder={
              <Placeholder
                image='/assets/dashboard/task/due-date.png'
                text='No due date'
              />
            }
            renderValue={(date) => <RenderTaskDate date={date} />}
            className='w-[130px] hover:bg-transparent px-0'
          />
        )}
      </CustomFormField>
    </div>
  );
}

function CustomFormField({ form, name, label, children }: ICustomFieldProps) {
  return (
    <FormField
      form={form}
      name={name}
      label={label?.toLocaleUpperCase()}
      className='flex flex-col gap-3 text-sm font-medium leading-[160%] text-grey-400'
    >
      {(field) => children(field)}
    </FormField>
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
        <Placeholder
          image='/assets/dashboard/task/asignee.png'
          text='No asignee'
        />
      }
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

function Placeholder({ image, text }: { image: string; text: string }) {
  return (
    <div className='w-full flex items-center gap-3'>
      <Image
        src={image}
        alt='placeholder'
        width={32}
        height={32}
      />
      <p className='text-xs font-medium leading-[160%] text-grey-500'>{text}</p>
    </div>
  );
}

const categories: { label: React.ReactNode; value: string }[] = [
  { label: <TaskCategoryTag category='development' />, value: 'development' },
  { label: <TaskCategoryTag category='design' />, value: 'design' },
  { label: <TaskCategoryTag category='planning' />, value: 'planning' },
];

type TaskSchema = z.infer<typeof taskSchema>;

interface ICustomFieldProps {
  form: UseFormReturn<TaskSchema>;
  name: Path<TaskSchema>;
  label?: string;
  children: (field: Partial<ControllerRenderProps>) => React.ReactNode;
}

interface IAsigneeSelect {
  value: string[];
  onValueChange?: (value: string[]) => void;
}
