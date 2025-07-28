'use client';

import * as ProgressPrimitive from '@radix-ui/react-progress';
import type * as React from 'react';

import { cn } from '@/lib/utils';

function Progress({
  className,
  value,
  indicatorColor,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & { indicatorColor: string }) {
  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn('bg-grey-200 relative h-1.5 w-full overflow-hidden rounded-full', className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot='progress-indicator'
        className={cn('h-full w-full flex-1 transition-all rounded-full', indicatorColor)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
}

export { Progress };
