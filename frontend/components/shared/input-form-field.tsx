import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormField } from '@/components/reuseable/base-form';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export function InputFormField<T extends FieldValues>({
  name,
  form,
  placeholder,
  children,
  label,
  classNames,
}: InputProps<T>) {
  return (
    <FormField
      form={form}
      name={name}
      label={label}
      showError
      showMessage
    >
      {(field, meta) => (
        <div className={cn('relative w-full h-fit', classNames?.wrapper)}>
          <Input
            className={cn(
              'text-sm xl:text-base font-normal border-grey-200 leading-[160%] placeholder:text-grey-400 shadow-none focus-visible:ring-0 focus-visible:border-primary-600 transition-colors duration-200',
              { 'border-grey-200 hover:border-primary-600': !meta.error },
              { 'border-glamour-pink-500': meta.error },
              { 'border-algal-500': meta.isValid },
              classNames?.input,
            )}
            placeholder={placeholder}
            {...field}
          />

          {children}
        </div>
      )}
    </FormField>
  );
}

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
  placeholder: string;
  children?: React.ReactNode;
  label?: string;
  classNames?: {
    input?: string;
    wrapper?: string;
  };
}
