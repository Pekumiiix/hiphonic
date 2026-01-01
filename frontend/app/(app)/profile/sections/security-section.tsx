'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Lock } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { FormBase } from '@/components/reuseable/base-form';
import { InputFormField } from '@/components/shared/input-form-field';
import { SubmitButton } from '@/components/shared/submit-button';
import { useUpdatePassword } from '@/hooks/use-profile';
import { ProfileSectionWrapper } from '../components/section-wrapper';
import { type SecurityData, securitySchema } from '../schema/security';

export function SecuritySection() {
  const { mutate, isPending } = useUpdatePassword();

  const securityForm = useForm<SecurityData>({
    resolver: zodResolver(securitySchema),
  });

  function handleSave(data: SecurityData) {
    mutate(data);
  }

  return (
    <ProfileSectionWrapper
      icon={Lock}
      title='Security'
    >
      <FormBase
        form={securityForm}
        onSubmit={handleSave}
        className='space-y-4'
      >
        <InputFormField
          form={securityForm}
          name='currentPassword'
          placeholder='Enter your current password'
          label='Current Password'
          classNames={{ input: 'h-10', wrapper: 'max-w-md' }}
        />

        <InputFormField
          form={securityForm}
          name='newPassword'
          placeholder='Enter your new password'
          label='New Password'
          classNames={{ input: 'h-10', wrapper: 'max-w-md' }}
        />

        <InputFormField
          form={securityForm}
          name='confirmPassword'
          placeholder='Confirm your new password'
          label='Confirm New Password'
          classNames={{ input: 'h-10', wrapper: 'max-w-md' }}
        />

        <SubmitButton
          name='Update password'
          isLoading={isPending}
          disabled={!securityForm.formState.isDirty}
        />
      </FormBase>
    </ProfileSectionWrapper>
  );
}
