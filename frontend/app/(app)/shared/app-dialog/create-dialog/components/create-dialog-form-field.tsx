import type { ControllerRenderProps, Path, UseFormReturn } from 'react-hook-form';
import { FormField } from '@/components/reuseable/base-form';
import type { DialogSchema } from '../schema';

export function CreateDialogFormField({ form, name, label, children }: ICreateDialogFieldProps) {
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

interface ICreateDialogFieldProps {
  form: UseFormReturn<DialogSchema>;
  name: Path<DialogSchema>;
  label?: string;
  children: (field: Partial<ControllerRenderProps>) => React.ReactNode;
}
