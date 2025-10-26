'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { FormBase } from '@/components/reuseable/base-form';
import { Button } from '@/components/ui/button';
import { useCreateNewPassword } from '@/hooks/use-auth';
import { AuthLogo } from '../../shared/auth-logo';
import { ConfirmationButton } from '../../shared/confirmation-button';
import FormContainer from '../../shared/form-container';
import { PasswordInput } from '../../shared/password-input';
import { ResultState } from '../../shared/result-state';
import { createPasswordSchema } from '../schema';

export default function CreateNewPasswordForm({ token }: { token: string }) {
  const [success, setSuccess] = useState<boolean>(false);

  return success ? (
    <div className='w-full h-full flex flex-col'>
      <AuthLogo />
      <ResultState
        name='You have successfully changed password.'
        showButton
      />
    </div>
  ) : (
    <CreatePasswordForm
      token={token}
      setSuccess={setSuccess}
    />
  );
}

function CreatePasswordForm({ setSuccess, token }: ICreatePasswordForm) {
  const createNewPasswordMutation = useCreateNewPassword();

  const { mutate, isPending } = createNewPasswordMutation;

  const router = useRouter();

  const form = useForm<TCreateNewPasswordData>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(data: TCreateNewPasswordData) {
    const newPassword = data.password;
    mutate(
      { newPassword, token: token ?? '' },
      {
        onSuccess: () => {
          setSuccess(true);
          router.replace('/create-new-password');
        },
        onError: () => {
          setSuccess(false);
        },
      },
    );
  }

  return (
    <FormContainer headline='Create a new password'>
      <FormBase
        form={form}
        onSubmit={onSubmit}
        className='flex flex-col gap-8'
      >
        <div className='flex flex-col gap-4'>
          {['password' as const, 'confirmPassword' as const].map((item) => (
            <PasswordInput
              key={item}
              form={form}
              name={item}
            />
          ))}
        </div>

        <div className='flex flex-col gap-2.5'>
          <ConfirmationButton
            isLoading={isPending}
            name='Continue'
          />
          <Button
            asChild
            variant='outline'
            className='w-full h-12 xl:h-14 rounded-[12px] text-base font-bold leading-[140%] tracking-[0.2px]'
          >
            <Link href='/sign-in'>Back to sign in</Link>
          </Button>
        </div>
      </FormBase>
    </FormContainer>
  );
}

interface ICreatePasswordForm {
  setSuccess: (success: boolean) => void;
  token: string;
}

type TCreateNewPasswordData = z.infer<typeof createPasswordSchema>;
