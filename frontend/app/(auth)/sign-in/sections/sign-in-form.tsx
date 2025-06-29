'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { BaseCheckbox } from '@/components/reuseable/base-checkbox';
import { FormBase, FormField } from '@/components/reuseable/base-form';
import { AuthInput } from '../../components/auth-input';
import { ConfirmationButton } from '../../components/confirmation-button';
import { PasswordInput } from '../../components/password-input';
import { defaultSignInValue, signInSchema } from '../schema';

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: defaultSignInValue,
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    try {
      const res = await fetch('http://localhost:3333/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        console.log(result);
        router.push('/');
      } else {
        if (result.message === 'Invalid credentials') {
          form.setError('password', { message: `${result.message}.` });
        } else form.setError('rememberMe', { type: 'server', message: 'Signin failed.' });
      }
    } catch (err) {
      console.error(err);
      form.setError('root', { type: 'server', message: 'Something went wrong.' });
    }
  }

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className='flex flex-col gap-8'
    >
      <div className='flex flex-col gap-4'>
        <AuthInput
          form={form}
          name='email'
          placeholder='Email'
          icon={
            <Mail
              size={24}
              className='size-[18px] xl:size-6 text-grey-400 absolute top-4 left-4'
            />
          }
        />

        <PasswordInput
          description='Your password must have at least 8 characters'
          form={form}
          name='password'
        />

        <div className='flex items-center justify-between'>
          <FormField
            form={form}
            showError
            showMessage
            name='rememberMe'
          >
            {(field) => (
              <BaseCheckbox
                id='yes'
                {...field}
                labelText='Remember me'
              />
            )}
          </FormField>

          <Link
            href='/reset-password'
            className='text-sm font-bold leading-[160%] text-primary-600'
          >
            Forgot Password?
          </Link>
        </div>
      </div>

      <ConfirmationButton name='Sign In' />
    </FormBase>
  );
}
