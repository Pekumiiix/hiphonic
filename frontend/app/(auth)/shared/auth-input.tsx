import type { LucideIcon } from 'lucide-react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { FormField } from '../../../components/reuseable/base-form';
import { Input } from '../../../components/ui/input';
import { cn } from '../../../lib/utils';

export function AuthInput<T extends FieldValues>({ name, form, Icon, placeholder }: InputProps<T>) {
  return (
    <FormField
      form={form}
      name={name}
      showError
      showMessage
    >
      {(field, meta) => (
        <div className='relative w-full h-fit'>
          <Icon
            size={24}
            className='size-[18px] xl:size-6 text-grey-400 absolute top-4 left-4'
          />
          <Input
            className={cn(
              'h-12 xl:h-14 rounded-[12px] py-3 xl:py-2 pl-[46px] xl:pl-[52px] pr-4 text-sm xl:text-base font-normal border-grey-200 leading-[160%] placeholder:text-grey-400 shadow-none focus-visible:ring-0 focus-visible:border-primary-600 transition-colors duration-200',
              { 'border-grey-200 hover:border-primary-600': !meta.error },
              { 'border-glamour-pink-500': meta.error },
              { 'border-algal-500': meta.isValid },
            )}
            placeholder={placeholder}
            {...field}
          />
        </div>
      )}
    </FormField>
  );
}

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
  Icon: LucideIcon;
  placeholder: string;
}
