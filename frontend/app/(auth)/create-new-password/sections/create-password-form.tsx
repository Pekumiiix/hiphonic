'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FormBase } from '@/components/reuseable/base-form';
import { Button } from '@/components/ui/button';
import { useCreateNewPassword } from '@/hooks/use-auth';
import { globalToasts } from '@/lib/toasts';
import { ConfirmationButton } from '../../shared/confirmation-button';
import FormContainer from '../../shared/form-container';
import { PasswordInput } from '../../shared/password-input';
import {
  type CreateNewPasswordData,
  createNewPasswordDefaultValues,
  createPasswordSchema,
} from '../schema';

export default function CreateNewPasswordForm({ token }: { token: string }) {
  const createNewPasswordMutation = useCreateNewPassword();

  const { mutate, isPending } = createNewPasswordMutation;

  const router = useRouter();

  const form = useForm<CreateNewPasswordData>({
    resolver: zodResolver(createPasswordSchema),
    defaultValues: createNewPasswordDefaultValues,
  });

  async function onSubmit(data: CreateNewPasswordData) {
    const newPassword = data.password;

    mutate(
      { newPassword, token: token ?? '' },
      {
        onSuccess: () => {
          router.replace('/sign-in');
          globalToasts.globalSuccess('Redirecting to sign-in page.');
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
