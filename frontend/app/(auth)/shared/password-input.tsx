'use client';

import { Eye, EyeOff, Lock } from 'lucide-react';
import { useState } from 'react';
import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { FormField } from '../../../components/reuseable/base-form';
import { Input } from '../../../components/ui/input';

export function PasswordInput<T extends FieldValues>({
  name,
  form,
  description,
  placeholder = 'Password',
}: InputProps<T>) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <FormField
      form={form}
      name={name}
      description={description}
      showError
      showMessage
    >
      {(field, meta) => (
        <div className='relative w-full h-fit'>
          <Lock
            size={24}
            className='size-[18px] xl:size-6 absolute text-grey-400 left-4 top-4 xl:top-4'
          />
          <Input
            type={showPassword ? 'text' : 'password'}
            className={cn(
              'h-12 xl:h-14 rounded-[12px] py-2 pl-[46px] xl:pl-[52px] pr-4 text-base font-normal border-grey-200 leading-[160%] placeholder:text-grey-400 shadow-none focus-visible:ring-0 focus-visible:border-primary-600 transition-colors duration-200',
              { 'border-grey-200 hover:border-primary-600': !meta.error },
              { 'border-glamour-pink-500': meta.error },
              { 'border-algal-500': meta.isValid },
            )}
            placeholder={placeholder}
            {...field}
          />
          <Button
            onClick={() => setShowPassword(!showPassword)}
            variant='ghost'
            type='button'
            className='absolute !p-0 max-w-fit h-fit hover:bg-transparent top-4 xl:top-5 right-4'
            aria-label='Show password text'
          >
            {showPassword ? (
              <EyeOff
                size={24}
                className='text-grey-400'
              />
            ) : (
              <Eye
                size={24}
                className='text-grey-400'
              />
            )}
          </Button>
        </div>
      )}
    </FormField>
  );
}

interface InputProps<T extends FieldValues> {
  name: Path<T>;
  form: UseFormReturn<T>;
  description?: string;
  placeholder?: string;
}
