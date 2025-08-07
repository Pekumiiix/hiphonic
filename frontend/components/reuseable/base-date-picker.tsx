import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export function BaseDatePicker({
  className,
  value,
  onChange,
  onBlur,
  placeholder = 'Pick a date',
}: BaseDatePickerProps) {
  const dateValue = value instanceof Date ? value : undefined;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='ghost'
          className={cn('w-fit flex items-center gap-3', className)}
          onBlur={onBlur}
        >
          <CalendarIcon
            size={20}
            className='text-inherit'
          />
          {dateValue ? (
            format(dateValue, 'PPP')
          ) : (
            <span className='text-inherit'>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0'>
        <Calendar
          mode='single'
          selected={dateValue}
          onSelect={onChange}
        />
      </PopoverContent>
    </Popover>
  );
}

interface BaseDatePickerProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  onBlur?: () => void;
  placeholder?: string;
}
