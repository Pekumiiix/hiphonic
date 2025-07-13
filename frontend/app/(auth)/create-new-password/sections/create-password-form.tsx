'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { type FieldValues, type Path, type UseFormReturn, useForm } from 'react-hook-form';
import type { z } from 'zod';
import { FormBase } from '@/components/reuseable/base-form';
import { Button } from '@/components/ui/button';
import { ConfirmationButton } from '../../components/confirmation-button';
import FormContainer from '../../components/form-container';
import { PasswordInput } from '../../components/password-input';
import { createPasswordSchema } from '../schema';

export default function CreateNewPasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const router = useRouter();
  const searchParam = useSearchParams();

  const form = useForm<z.infer<typeof createPasswordSchema>>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const token = searchParam.get('token');

  if (!token || token === undefined) {
    router.push('/sign-in');
  }

  async function onSubmit(data: z.infer<typeof createPasswordSchema>) {
    setIsLoading(true);

    const newPassword = data.password;

    try {
      const res = await fetch('/api/create-new-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess(true);
      } else {
        form.setError('confirmPassword', {
          message: result.message || 'Password reset failed',
        });
      }
    } catch (err) {
      console.error(err);
      form.setError('confirmPassword', { message: 'Something went wrong.' });
    } finally {
      setIsLoading(false);
    }
  }

  return success ? (
    <SuccessfullyChangedPassword />
  ) : (
    <CreatePasswordForm
      form={form}
      onSubmit={onSubmit}
      name={['password', 'confirmPassword']}
      isLoading={isLoading}
    />
  );
}

function CreatePasswordForm<T extends FieldValues>({
  form,
  onSubmit,
  name,
  isLoading,
}: ICreatePasswordForm<T>) {
  return (
    <FormContainer headline='Create a new password'>
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='flex flex-col gap-8'
      >
        <div className='flex flex-col gap-4'>
          {name.map((item) => (
            <PasswordInput
              key={item}
              form={form}
              name={item}
            />
          ))}
        </div>

        <ConfirmationButton
          isLoading={isLoading}
          name='Continue'
        />
      </FormBase>
    </FormContainer>
  );
}

function SuccessfullyChangedPassword() {
  return (
    <div className='w-full h-full md:w-[404px] flex flex-col justify-center items-center gap-3'>
      <Image
        src='/assets/auth/successful.gif'
        alt='Checkmark'
        width={150}
        height={150}
      />
      <p className='font-medium'>Successfully changed password.</p>
      <Button
        asChild
        className='w-fit h-fit'
      >
        <Link
          href='/sign-in'
          className='text-sm'
        >
          Sign In
        </Link>
      </Button>
    </div>
  );
}

interface ICreatePasswordForm<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  name: Path<T>[];
  isLoading: boolean;
}
