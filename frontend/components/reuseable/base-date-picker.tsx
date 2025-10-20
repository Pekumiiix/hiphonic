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
  renderValue,
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
          {!renderValue && (
            <CalendarIcon
              size={20}
              className='text-inherit'
            />
          )}

          {dateValue ? (
            renderValue ? (
              renderValue(dateValue)
            ) : (
              format(dateValue, 'PPP')
            )
          ) : (
            <RenderPlaceholder placeholder={placeholder} />
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

function RenderPlaceholder({ placeholder }: { placeholder: BaseDatePickerProps['placeholder'] }) {
  return typeof placeholder === 'string' ? (
    <span className='text-inherit'>{placeholder}</span>
  ) : (
    placeholder
  );
}

interface BaseDatePickerProps {
  className?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  onBlur?: () => void;
  placeholder?: string | React.ReactNode;
  renderValue?: (date: Date) => React.ReactNode;
}
