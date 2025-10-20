import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { Calendar1, Plus } from 'lucide-react';
import Image from 'next/image';
import type React from 'react';
import {
  type ControllerRenderProps,
  type FieldValues,
  type Path,
  type UseFormReturn,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';
import { BaseAvatar } from '@/components/reuseable/base-avatar';
import { BaseDatePicker } from '@/components/reuseable/base-date-picker';
import { FormBase, FormField } from '@/components/reuseable/base-form';
import { BaseUISelect } from '@/components/reuseable/base-ui-select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { CategoryBlock } from './category-block';
import { TaskDialogWrapper } from './task-dialog-wrapper';

const taskSchema = z.object({
  name: z.string(),
  assignee: z.array(z.string()),
  category: z.enum(['planning', 'development', 'design']),
  description: z.string(),
  due_date: z.date(),
});

export function CreateTaskButton() {
  const form = useForm<z.infer<typeof taskSchema>>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      category: 'development',
    },
  });

  function onSubmit(data: z.infer<typeof taskSchema>) {
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

        <Accordion
          defaultValue='details'
          type='single'
          collapsible
        >
          <AccordionItem
            value='details'
            className='rounded-xl border border-grey-100'
          >
            <AccordionTrigger className='text-xs font-bold text-grey-900 px-4 py-2.5 border-grey-100 data-[state=open]:border-b'>
              Details
            </AccordionTrigger>
            <AccordionContent className='min-h-fit p-2'>
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

                  <RenderDate date={new Date()} />
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
                      placeholder={<DueDatePlaceholder />}
                      renderValue={(date) => <RenderDate date={date} />}
                      className='w-[130px] hover:bg-transparent px-0'
                    />
                  )}
                </CustomFormField>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

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

function CustomFormField<T extends FieldValues>({
  form,
  name,
  label,
  children,
}: ICustomFieldProps<T>) {
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

function RenderDate({ date }: { date: Date }) {
  return (
    <div className='h-8 p-2 rounded-[8px] bg-grey-50 text-grey-900 font-semibold flex items-center gap-2 max-md:text-xs'>
      <Calendar1 size={20} />
      <p>{format(date, 'PPP')}</p>
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
      placeholder={<AsigneePlaceholder />}
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

function AsigneePlaceholder() {
  return (
    <div className='flex items-center gap-3'>
      <Image
        src='/assets/dashboard/task/asignee.png'
        alt='placeholder'
        width={32}
        height={32}
      />
      <p className='text-xs font-medium leading-[160%] text-grey-500'>No assignee</p>
    </div>
  );
}

function DueDatePlaceholder() {
  return (
    <div className='w-full flex items-center gap-3'>
      <Image
        src='/assets/dashboard/task/due-date.png'
        alt='placeholder'
        width={32}
        height={32}
      />
      <p className='text-xs font-medium leading-[160%] text-grey-500'>No due date</p>
    </div>
  );
}

const categories: { label: React.ReactNode; value: string }[] = [
  { label: <CategoryBlock category='development' />, value: 'development' },
  { label: <CategoryBlock category='design' />, value: 'design' },
  { label: <CategoryBlock category='planning' />, value: 'planning' },
];

interface ICustomFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  children: (field: Partial<ControllerRenderProps>) => React.ReactNode;
}

interface IAsigneeSelect {
  value: string[];
  onValueChange?: (value: string[]) => void;
}
