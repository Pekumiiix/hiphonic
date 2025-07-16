'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import type { z } from 'zod';
import { BaseCheckbox } from '@/components/reuseable/base-checkbox';
import { FormBase, FormField } from '@/components/reuseable/base-form';
import { ToastComponent } from '@/components/reuseable/toast-variants';
import { useSignIn } from '@/lib/hooks/use-sign-in';
import { AuthInput } from '../../components/auth-input';
import { ConfirmationButton } from '../../components/confirmation-button';
import { PasswordInput } from '../../components/password-input';
import { defaultSignInValue, signInSchema } from '../schema';

export default function SignInForm() {
  const { mutate, isPending } = useSignIn();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: defaultSignInValue,
  });

  async function onSubmit(data: z.infer<typeof signInSchema>) {
    mutate(data, {
      onSuccess: () => {
        router.push('/dashboard');
      },
      onError: (data) => {
        if (data.message === 'Something went wrong.') {
          toast(
            <ToastComponent
              variant='error'
              message={data.message}
            />,
            { position: 'top-right' },
          );
        } else {
          form.setError('email', { type: 'server' });
          form.setError('password', { type: 'server', message: data.message });
        }
      },
    });
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
          Icon={Mail}
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

      <ConfirmationButton
        isLoading={isPending}
        name='Sign In'
      />
    </FormBase>
  );
}
