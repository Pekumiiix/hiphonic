'use client';

import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { globalToasts } from '@/lib/toasts';

export function ShareButton({ projectName }: IShareButtonProps) {
  const currentUrl = window.location.href;

  async function handleShare({ projectName }: IShareButtonProps) {
    const shareData = {
      title: `${projectName} | Project Dashboard`,
      text: `Check out the ${projectName} project dashboard. Track tasks, manage progress, and collaborate with your team.`,
      url: currentUrl,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (_) {
        globalToasts.globalError('An error occurred while sharing.');
      }
    } else {
      await handleCopyUrl();
    }
  }

  async function handleCopyUrl() {
    if (!navigator.clipboard) {
      alert('Clipboard API is not available on your browser.');

      return;
    }

    try {
      await navigator.clipboard.writeText(currentUrl);

      globalToasts.globalSuccess('URL copied to clipboard!');
    } catch (_) {
      globalToasts.globalError('Failed to copy URL. Please try again.');
    }
  }

  return (
    <Button
      onClick={() => handleShare({ projectName })}
      variant='outline'
      className='w-fit h-10 lg:h-12 py-2 px-4 rounded-xl flex items-center gap-2 text-sm font-bold text-grey-900'
    >
      <Share2 size={22} />
      <span>Share</span>
    </Button>
  );
}

interface IShareButtonProps {
  projectName: string;
}
