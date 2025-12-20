'use client';

import { zodResolver } from '@hookform/resolvers/zod/dist/zod.js';
import { Camera, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { BaseAvatar } from '@/components/reuseable/base-avatar';
import { FormBase } from '@/components/reuseable/base-form';
import { InputFormField } from '@/components/shared/input-form-field';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFileUpload } from '@/hooks/use-file-upload';
import { cn } from '@/lib/utils';
import { useAuth } from '@/provider/auth-provider';
import { ProfileSectionWrapper } from '../components/section-wrapper';
import { type UsernameData, usernameSchema } from '../schema/profile';

export function ProfileSection() {
  const { user } = useAuth();

  const [
    { files, isDragging }, // errors
    { removeFile, getInputProps, getRootProps }, // openFileDialog
  ] = useFileUpload({
    maxFiles: 1,
    maxSize: 2 * 1024 * 1024,
    accept: { 'image/*': [] },
    multiple: false,
    noClick: true,
    onFilesChange: (files) => {
      console.log('Selected files:', files);
    },
  });

  const currentFile = files[0];
  const previewUrl = currentFile ? URL.createObjectURL(currentFile) : user?.avatarUrl || '';

  const handleRemove = () => {
    if (currentFile) {
      removeFile(currentFile);
    }

    return;
  };

  const usernameForm = useForm<UsernameData>({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: user?.username || '',
    },
  });

  function handleUsernameUpdate(data: UsernameData) {
    console.log('Username updated to:', data.username);
  }

  return (
    <ProfileSectionWrapper
      icon={User}
      title='Profile Information'
    >
      <div className='space-y-4'>
        <div
          className='flex flex-col gap-4'
          {...getRootProps()}
        >
          <BaseAvatar
            username={user?.username}
            avatar={previewUrl}
            classNames={{
              avatar: cn('size-[150px] border-2', {
                'border-primary-500': isDragging,
                'border-border': !isDragging,
              }),
            }}
          />

          <div className='space-y-2'>
            {files ? (
              <>
                <Label
                  htmlFor='avatar-upload'
                  className='w-fit flex items-center gap-2 px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border'
                >
                  <Camera className='h-4 w-4' />
                  <span className='text-sm font-medium'>Change Photo</span>
                </Label>

                <Input
                  id='avatar-upload'
                  type='file'
                  accept='image/*'
                  className='sr-only'
                  {...getInputProps()}
                />
              </>
            ) : (
              <ActionButtons
                onCancel={handleRemove}
                onSave={() => {}}
              />
            )}
            <p className='text-xs text-muted-foreground'>
              {isDragging ? 'Drag file here.' : 'JPG, PNG or GIF. Max size 2MB.'}
            </p>
          </div>
        </div>
      </div>

      <FormBase
        form={usernameForm}
        onSubmit={handleUsernameUpdate}
        className='flex flex-col gap-2.5'
      >
        <InputFormField
          form={usernameForm}
          name='username'
          placeholder='Enter your desired username'
          label='Username'
          classNames={{ input: 'h-10', wrapper: 'max-w-md' }}
        />

        <Button
          disabled={!usernameForm.getFieldState('username').isDirty}
          className='size-fit'
        >
          Update
        </Button>
      </FormBase>

      <div className='space-y-2'>
        <Label
          htmlFor='email'
          className='text-foreground'
        >
          Email Address
        </Label>
        <Input
          id='email'
          value={user?.email}
          disabled
          className='max-w-md bg-muted border-input cursor-not-allowed opacity-60 capitalize'
        />
        <p className='text-xs text-muted-foreground'>Your email cannot be changed</p>
      </div>
    </ProfileSectionWrapper>
  );
}

function ActionButtons({ onCancel, onSave }: IActionButtons) {
  return (
    <div className='flex items-center gap-2.5'>
      <Button
        variant='destructive'
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button onClick={onSave}>Save Changes</Button>
    </div>
  );
}

interface IActionButtons {
  onCancel: () => void;
  onSave: () => void;
}
