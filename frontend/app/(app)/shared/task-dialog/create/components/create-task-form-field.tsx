import type { ControllerRenderProps, Path, UseFormReturn } from 'react-hook-form';
import { FormField } from '@/components/reuseable/base-form';
import type { TaskSchema } from '../schema';

export function CreateTaskFormField({ form, name, label, children }: ICreateTaskFieldProps) {
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

interface ICreateTaskFieldProps {
  form: UseFormReturn<TaskSchema>;
  name: Path<TaskSchema>;
  label?: string;
  children: (field: Partial<ControllerRenderProps>) => React.ReactNode;
}
