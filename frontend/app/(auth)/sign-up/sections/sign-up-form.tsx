'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { UseMutateFunction } from '@tanstack/react-query';
import { Mail, User } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { BaseCheckbox } from '@/components/reuseable/base-checkbox';
import { FormBase, FormField } from '@/components/reuseable/base-form';
import { Label } from '@/components/ui/label';
import { useSignUp } from '@/hooks/use-auth';
import { globalToasts } from '@/lib/toasts';
import type { IApiResponse } from '@/types/api';
import type { ISignUpPayLoad } from '@/types/auth';
import AlternativeAuthMethod from '../../shared/alternative-auth-method';
import { AuthInput } from '../../shared/auth-input';
import { AuthLogo } from '../../shared/auth-logo';
import { ConfirmationButton } from '../../shared/confirmation-button';
import FormContainer from '../../shared/form-container';
import { PasswordInput } from '../../shared/password-input';
import { ResultState } from '../../shared/result-state';
import { type SignUpData, signUpSchema } from '../schema';

export default function SignUpForm() {
  const signUpMutation = useSignUp();

  const { mutate, isSuccess, isPending } = signUpMutation;

  if (isSuccess) {
    return (
      <div className='w-full h-full flex flex-col'>
        <AuthLogo />

        <ResultState
          name='Check your email for your verification link.'
          showButton={false}
        />
      </div>
    );
  }

  return (
    <FormContainer headline='Sign Up for an Account'>
      <AuthForm
        mutate={mutate}
        isPending={isPending}
      />

      <AlternativeAuthMethod />
    </FormContainer>
  );
}

function AuthForm({ mutate, isPending }: IAuthForm) {
  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpData) {
    mutate(
      { ...data, email: data.email.toLowerCase() },
      {
        onError: (data) => {
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
          href='#'
          className='text-black font-semibold'
        >
          Terms & Conditions
        </Link>{' '}
        and our{' '}
        <Link
          href='#'
          className='text-black font-semibold'
        >
          Privacy Policy
        </Link>
      </p>
    </Label>
  );
}

const errorMap: Record<string, 'email' | 'username'> = {
  'Email is already registered': 'email',
  'Username is already taken': 'username',
};

interface IAuthForm {
  mutate: UseMutateFunction<IApiResponse, Error, ISignUpPayLoad, unknown>;
  isPending: boolean;
}
