'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormBase } from '@/components/reuseable/base-form';
import { ConfirmationButton } from '../../components/confirmation-button';
import { PasswordInput } from '../../components/password-input';

const createPasswordSchema = z
  .object({
    password: z
      .string({ required_error: 'Provide a valid password.' })
      .min(8, { message: 'Password must be at least 8 characters long' })
      .regex(/[a-z]/, {
        message: 'Password must contain at least one lowercase letter',
      })
      .regex(/[A-Z]/, {
        message: 'Password must contain at least one uppercase letter',
      })
      .regex(/[0-9]/, { message: 'Password must contain at least one number' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must contain at least one special character',
      }),
    confirmPassword: z.string({
      required_error: 'Please confirm your password.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export default function CreateNewPasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();
  const searchParam = useSearchParams();

  const form = useForm<z.infer<typeof createPasswordSchema>>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: z.infer<typeof createPasswordSchema>) {
    setIsLoading(true);

    const newPassword = data.password;
    const token = searchParam.get('token');

    if (!token || token === undefined) {
      router.push('/sign-in');
    }

    try {
      const res = await fetch('http://localhost:3333/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await res.json();

      if (res.ok) {
        router.push('/sign-in');
      } else {
        form.setError('confirmPassword', { message: result.message || 'Password reset failed' });
      }
    } catch (err) {
      console.error(err);
      form.setError('confirmPassword', { message: 'Something went wrong.' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className='flex flex-col gap-8'
    >
      <div className='flex flex-col gap-4'>
        <PasswordInput
          form={form}
          name='password'
        />
        <PasswordInput
          form={form}
          name='confirmPassword'
          placeholder='Confirm password'
        />
      </div>

      <ConfirmationButton
        isLoading={isLoading}
        name='Continue'
      />
    </FormBase>
  );
}
