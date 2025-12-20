import type { LucideIcon } from 'lucide-react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { InputFormField } from '@/components/shared/input-form-field';

export function AuthInput<T extends FieldValues>({ name, form, placeholder, Icon }: InputProps<T>) {
  return (
    <InputFormField
      name={name}
      form={form}
      placeholder={placeholder}
      classNames={{
        input: 'h-12 xl:h-14 rounded-[12px] py-3 xl:py-2 pl-[46px] xl:pl-[52px] pr-4',
      }}
    >
      <Icon
        size={24}
        className='size-[18px] xl:size-6 text-grey-400 absolute top-4 left-4'
      />
    </InputFormField>
  );
}

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
  Icon: LucideIcon;
  placeholder: string;
}
