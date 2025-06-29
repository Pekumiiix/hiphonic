'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { BaseCheckbox } from '@/components/reuseable/base-checkbox';
import { FormBase, FormField } from '@/components/reuseable/base-form';
import { Label } from '@/components/ui/label';
import { AuthInput } from '../../components/auth-input';
import { ConfirmationButton } from '../../components/confirmation-button';
import { PasswordInput } from '../../components/password-input';
import { signUpSchema } from '../schema';

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    try {
      const res = await fetch('http://localhost:3333/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        console.log(result);
        router.push('/');
      } else {
        if (result.message === 'Email is already registered') {
          form.setError('email', {
            type: 'server',
            message: 'This email is already registered',
          });
        } else if (result.message === 'Username is already taken') {
          form.setError('username', {
            type: 'server',
            message: 'This username is already taken',
          });
        } else {
          form.setError('termsAccepted', { type: 'server', message: 'Sign up failed.' });
        }
      }
    } catch (err) {
      console.error(err);
      form.setError('root', { type: 'server', message: 'Something went wrong' });
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
          name='username'
          placeholder='Username'
          icon={
            <User
              size={24}
              className='size-[18px] xl:size-6 text-grey-400 absolute top-4 left-4'
            />
          }
        />

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
      </div>

      <FormField
        form={form}
        showError
        showMessage
        name='termsAccepted'
      >
        {(field) => (
          <BaseCheckbox
            id='yes'
            {...field}
            label={<CheckboxLabel />}
          />
        )}
      </FormField>

      <ConfirmationButton name='Sign Up' />
    </FormBase>
  );
}

function CheckboxLabel() {
  return (
    <Label
      htmlFor='yes'
      className='text-xs leading-[160%] text-grey-500 '
    >
      <p>
        By creating an account means you agree to the{' '}
        <Link
          href='/'
          className='text-black font-semibold'
        >
          Terms & Conditions
        </Link>{' '}
        and our{' '}
        <Link
          href='/'
          className='text-black font-semibold'
        >
          Privacy Policy
        </Link>
      </p>
    </Label>
  );
}
