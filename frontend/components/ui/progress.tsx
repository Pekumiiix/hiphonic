'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Progress({
  className,
  value,
  indicatorStyle,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { indicatorStyle?: React.CSSProperties }) {
  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn('bg-grey-200 relative h-1.5 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className='h-full w-full flex-1 transition-all rounded-full'
        style={{ transform: `translateX(-${100 - (value || 0)}%)`, ...indicatorStyle }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
