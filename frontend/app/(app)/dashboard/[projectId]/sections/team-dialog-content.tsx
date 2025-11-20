import { zodResolver } from '@hookform/resolvers/zod';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FormBase, FormField } from '@/components/reuseable/base-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const teamSchema = z.object({
  email: z
    .string({ required_error: 'Provide a valid email address.' })
    .email({ message: 'Provide a valid email address.' }),
});

export function TeamDialogContent() {
  const form = useForm<TeamSchema>({
    resolver: zodResolver(teamSchema),
  });

  function onSubmit(data: TeamSchema) {
    console.log(data);
  }

  return (
    <FormBase
      form={form}
      onSubmit={onSubmit}
      className='w-full flex flex-col'
    >
      <FormField
        form={form}
        name='email'
        className='w-full flex flex-col text-xs'
      >
        {(field) => (
          <div className='w-full flex items-center gap-2.5'>
            <Input
              {...field}
              placeholder='Enter user email address'
              className='h-10 rounded-[12px] text-xs py-3 xl:py-2 font-normal border-grey-200 leading-[160%] shadow-none placeholder:text-grey-400 focus-visible:ring-0 focus-visible:border-primary-600 transition-colors duration-200'
            />

            <Button>
              <Plus />
            </Button>
          </div>
        )}
      </FormField>
    </FormBase>
  );
}

type TeamSchema = z.infer<typeof teamSchema>;
