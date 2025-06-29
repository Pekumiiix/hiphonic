'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormBase } from '@/components/reuseable/base-form';
import { Button } from '@/components/ui/button';
import { AuthInput } from '../../components/auth-input';
import { ConfirmationButton } from '../../components/confirmation-button';

const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Provide a valid email address.' })
    .email({ message: 'Please enter a valid email address.' }),
});

export default function ResetPasswordForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  async function onSubmit(data: z.infer<typeof resetPasswordSchema>) {
    try {
      const res = await fetch('http://localhost:3333/verify-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        console.log(result);
        router.push('/verify-email');
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
    }
  }

  return (
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

      <ConfirmationButton name='Continue' />

      <Button
        type='button'
        variant='ghost'
        className='w-full h-14 rounded-[12px] text-sm font-bold leading-[140%] tracking-[0.2px] text-primary-600 hover:text-primary-800'
        asChild
      >
        <Link href='/sign-in'>Back to Sign In</Link>
      </Button>
    </FormBase>
  );
}
