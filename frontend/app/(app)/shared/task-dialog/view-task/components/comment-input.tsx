'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';
import { BaseAvatar } from '@/components/reuseable/base-avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/provider/auth-provider';

export function CommentInput() {
  const [comment, setComment] = useState('');

  const { user } = useAuth();

  return (
    <div className='flex gap-4'>
      <BaseAvatar
        username={user?.username}
        avatar={user?.avatarUrl}
        classNames={{ image: 'size-8' }}
      />

      <div className='w-full h-10 flex items-center gap-2.5 py-2 px-3 rounded-xl border border-grey-100'>
        <Input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder='Add a comment...'
          className='p-0 w-full h-full border-none shadow-none rounded-none text-xs placeholder:text-grey-400 focus-visible:ring-0'
        />

        <Button
          variant='ghost'
          disabled={comment === ''}
          className='!w-4 h-full p-0.5 rounded-[5px]'
        >
          <Send className='!size-3' />
        </Button>
      </div>
    </div>
  );
}
