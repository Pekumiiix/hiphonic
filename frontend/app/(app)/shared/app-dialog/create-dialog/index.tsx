'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { BaseAccordion } from '@/components/reuseable/base-accordion';
import { FormBase, FormField } from '@/components/reuseable/base-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AppDialogWrapper } from '../components/app-dialog-wrapper';
import { CreateDialogFormField } from './components/create-dialog-form-field';
import { type DialogSchema, dialogSchema } from './schema';
import { AccordionFormContent } from './sections/accordion-form-content';

export function CreateDialog({ type, children }: ICreateDialog) {
  const isTask = type === 'task';

  const form = useForm<DialogSchema>({
    resolver: zodResolver(dialogSchema),
    defaultValues: {
      category: isTask ? 'development' : 'engineering',
      assignee: [],
    },
  });

  function onSubmit(data: DialogSchema) {
    console.log(data);
  }

  return (
    <AppDialogWrapper
      trigger={<div className='flex'>{children}</div>}
      title={`Create new ${type}`}
      description={`Fill out the form below to add a new ${type}.`}
      space={isTask ? 'Hiphonic' : undefined}
      mode='create'
      onDelete={() => {}}
    >
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='w-full px-4 md:px-6 pb-6 flex flex-col gap-8'
      >
        <CreateDialogFormField
          form={form}
          name='name'
        >
          {(field) => (
            <Input
              {...field}
              placeholder={`Write a ${type} name`}
              className='w-full p-0 border-transparent placeholder:font-bold placeholder:leading-[22px] placeholder:text-grey-400 shadow-none focus-visible:ring-0 focus-visible:border-0'
            />
          )}
        </CreateDialogFormField>

        <BaseAccordion
          collapsible
          type='single'
          defaultValue='details'
          items={[
            {
              value: 'details',
              trigger: 'Details',
              content: (
                <AccordionFormContent
                  isTask={isTask}
                  form={form}
                />
              ),
            },
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

        <Button className='self-end w-fit h-12'>Create {type}</Button>
      </FormBase>
    </AppDialogWrapper>
  );
}

interface ICreateDialog {
  type: 'task' | 'goal';
  children: React.ReactNode;
}
