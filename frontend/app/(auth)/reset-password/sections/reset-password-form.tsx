'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormBase } from '@/components/reuseable/base-form';
import { Button } from '@/components/ui/button';
import { AuthInput } from '../../components/auth-input';
import { ConfirmationButton } from '../../components/confirmation-button';
import FormContainer from '../../components/form-container';

const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Provide a valid email address.' })
    .email({ message: 'Please enter a valid email address.' }),
});

export default function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(true);
  const [formData, setFormData] = useState<z.infer<typeof resetPasswordSchema>>();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3333/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        console.log(result);
        setSuccess(true);
        setFormData(data);
      } else {
        if (result.message === 'The email is not tied to any account.') {
          form.setError('email', {
            type: 'server',
            message: result.message,
          });
        }
      }
    } catch (err) {
      console.error(err);
      form.setError('root', { type: 'server', message: 'Something went wrong' });
    } finally {
      setIsLoading(false);
    }
  }

  return success ? (
    <SuccessState
      onResend={() => formData && onSubmit(formData)}
      isLoading={isLoading}
    />
  ) : (
    <EmailForm
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
}

function EmailForm({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: z.infer<typeof resetPasswordSchema>) => void;
  isLoading: boolean;
}) {
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

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
          name='email'
          placeholder='Email'
          icon={
            <Mail
              size={24}
              className='size-[18px] xl:size-6 text-grey-400 absolute top-4 left-4'
            />
          }
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

function SuccessState({ onResend, isLoading }: { onResend: () => void; isLoading: boolean }) {
  return (
    <FormContainer
      headline='Verify your Email'
      description='Thank you, check your email for instructions to reset your password'
    >
      <div className='w-fit flex gap-1'>
        <p className='text-black text-sm leading-[160%]'>Didn’t receive an email?</p>
        <Button
          onClick={onResend}
          variant='ghost'
          className='text-sm font-bold text-primary-600 hover:text-primary-400 transition-colors duration-200 p-0 w-fit h-fit hover:bg-transparent'
        >
          {isLoading ? (
            <div className='w-5 h-5 border-4 border-primary-600 border-t-transparent rounded-full animate-spin' />
          ) : (
            'Resend'
          )}
        </Button>
      </div>
    </FormContainer>
  );
}
