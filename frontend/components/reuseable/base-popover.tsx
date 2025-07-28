import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export function BasePopover({
  className,
  children,
  trigger,
}: {
  className?: string;
  trigger: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger className={className}>{trigger}</PopoverTrigger>
      <PopoverContent className='max-w-[120px] flex flex-col gap-1 p-2'>{children}</PopoverContent>
    </Popover>
  );
}
