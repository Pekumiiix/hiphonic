'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { type Path, type UseFormReturn, useForm } from 'react-hook-form';
import { FormBase } from '@/components/reuseable/base-form';
import { Button } from '@/components/ui/button';
import { useResetPassword } from '@/hooks/use-auth';
import { globalToasts } from '@/lib/toasts';
import { formatTime } from '@/utils/format-time';
import { AuthInput } from '../../shared/auth-input';
import { ConfirmationButton } from '../../shared/confirmation-button';
import FormContainer from '../../shared/form-container';
import { resetPasswordSchema, type TSignUpData } from '../schema';

export default function ResetPasswordForm() {
  const [formData, setFormData] = useState<TSignUpData>();
  const [countdown, setCountdown] = useState<number>(0);

  const resetPasswordMutation = useResetPassword();

  const { mutate, isPending, isSuccess } = resetPasswordMutation;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const form = useForm<TSignUpData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: TSignUpData) {
    mutate(data, {
      onSuccess: () => {
        setFormData(data);
        setCountdown(1200);
      },
      onError: (data) => {
        const field = errorMap[data.message];

        if (field) {
          form.setError(field, { type: 'server', message: data.message });
        } else {
          globalToasts.globalError(data.message);
        }
      },
    });
  }

  if (isSuccess) {
    return (
      <SuccessState
        onResend={() => formData && onSubmit(formData)}
        isLoading={isPending}
        countdown={countdown}
        formatTime={formatTime}
      />
    );
  }

  return (
    <EmailForm
      onSubmit={onSubmit}
      isLoading={isPending}
      form={form}
      name='email'
    />
  );
}

function EmailForm({ onSubmit, isLoading, form, name }: IEmailForm) {
  return (
    <FormContainer
      headline='Reset your password'
      description='Enter the email address associated with your account and we will send you a link to reset your password.'
    >
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='flex flex-col gap-8'
      >
        <AuthInput
          form={form}
          name={name}
          placeholder='Email'
          Icon={Mail}
        />

        <ConfirmationButton
          isLoading={isLoading}
          name='Continue'
        />

        <Button
          type='button'
          variant='ghost'
          className='w-full h-14 rounded-[12px] text-sm font-bold leading-[140%] tracking-[0.2px] text-primary-600 hover:text-primary-800'
          asChild
        >
          <Link href='/sign-in'>Back to Sign In</Link>
        </Button>
      </FormBase>
    </FormContainer>
  );
}

function SuccessState({ onResend, isLoading, countdown, formatTime }: ISuccessState) {
  const canResend = countdown === 0;

  return (
    <FormContainer
      headline='Verify your Email'
      description='Thank you, check your email for instructions to reset your password'
    >
      <div className='w-fit flex gap-1'>
        <p className='text-black text-sm leading-[160%]'>Didn&apos;t receive an email?</p>
        <Button
          onClick={onResend}
          disabled={!canResend || isLoading}
          variant='ghost'
          className='text-sm font-bold text-primary-600 hover:text-primary-400 transition-colors duration-200 p-0 w-fit h-fit hover:bg-transparent disabled:opacity-50 disabled:cursor-not-allowed'
        >
          {isLoading ? (
            <div className='w-5 h-5 border-4 border-primary-600 border-t-transparent rounded-full animate-spin' />
          ) : canResend ? (
            'Resend'
          ) : (
            `Resend in ${formatTime(countdown)}`
          )}
        </Button>
      </div>
    </FormContainer>
  );
}

const errorMap: Record<string, 'email'> = {
  'This email is not tied to any account.': 'email',
};

interface IEmailForm {
  onSubmit: (data: TSignUpData) => void;
  isLoading: boolean;
  form: UseFormReturn<TSignUpData>;
  name: Path<TSignUpData>;
}

interface ISuccessState {
  onResend: () => void;
  isLoading: boolean;
  countdown: number;
  formatTime: (seconds: number) => string;
}
