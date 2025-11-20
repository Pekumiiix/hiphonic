import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { BaseAccordion } from '@/components/reuseable/base-accordion';
import { FormBase, FormField } from '@/components/reuseable/base-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { TaskDialogWrapper } from '../components/task-dialog-wrapper';
import { AccordionFormContent } from './components/accordion-form-content';
import { CreateTaskFormField } from './components/create-task-form-field';
import { type TaskSchema, taskSchema } from './schema';

export function CreateTaskDialog() {
  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      category: 'development',
      assignee: [],
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
      mode='create'
    >
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='w-full px-4 md:px-6 pb-6 flex flex-col gap-8'
      >
        <CreateTaskFormField
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
        </CreateTaskFormField>

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
