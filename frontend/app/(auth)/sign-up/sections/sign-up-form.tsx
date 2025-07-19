'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { BaseCheckbox } from '@/components/reuseable/base-checkbox';
import { FormBase, FormField } from '@/components/reuseable/base-form';
import { Label } from '@/components/ui/label';
import { useSignUp } from '@/lib/hooks/use-sign-up';
import { globalToasts } from '@/lib/toasts';
import AlternativeAuthMethod from '../../components/alternative-auth-method';
import { AuthInput } from '../../components/auth-input';
import { AuthLogo } from '../../components/auth-logo';
import { ConfirmationButton } from '../../components/confirmation-button';
import FormContainer from '../../components/form-container';
import { PasswordInput } from '../../components/password-input';
import { ResultState } from '../../components/result-state';
import { signUpSchema } from '../schema';

export default function SignUpForm() {
  const [success, setSuccess] = useState<boolean>(false);

  return success ? (
    <div className='w-full h-full flex flex-col'>
      <AuthLogo />

      <ResultState
        name='Check your email for your verification link.'
        showButton={false}
      />
    </div>
  ) : (
    <FormContainer headline='Sign Up for an Account'>
      <AuthForm setSuccess={setSuccess} />

      <AlternativeAuthMethod />
    </FormContainer>
  );
}

function AuthForm({ setSuccess }: { setSuccess: (success: boolean) => void }) {
  const { mutate, isPending } = useSignUp();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: z.infer<typeof signUpSchema>) {
    mutate(
      { ...data, email: data.email.toLowerCase() },
      {
        onSuccess: () => {
          setSuccess(true);
        },
        onError: (data) => {
          const errorMap: Record<string, 'email' | 'username'> = {
            'Email is already registered': 'email',
            'Username is already taken': 'username',
          };
          const field = errorMap[data.message];
          if (field) {
            form.setError(field, { type: 'server', message: data.message });
          } else {
            globalToasts.globalError(data.message);
          }
        },
      },
    );
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
          Icon={User}
        />

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

      <ConfirmationButton
        isLoading={isPending}
        disabled={!form.getValues('termsAccepted')}
        name='Sign Up'
      />
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
