'use client';

import { ChevronLeft, ChevronRight, type LucideIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { months, weekDays } from '@/lib/constants';
import { getDaysInMonth, getIsDateInCurrentMonth, getIsToday } from '@/lib/date';
import { cn } from '@/lib/utils';

export default function CalendarSection() {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  function navigateMonth(direction: number) {
    const newDate = new Date(currentDate);

    newDate.setMonth(newDate.getMonth() + direction);

    setCurrentDate(newDate);
  }

  const days = useMemo(() => {
    return getDaysInMonth(currentDate);
  }, [currentDate]);

  return (
    <div className='w-full h-fit flex flex-col gap-3 bg-white rounded-xl p-6'>
      <div className='flex items-center justify-between pb-4 border-b border-grey-100'>
        <p className='font-bold text-grey-900 leading-[160%]'>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </p>

        <div className='flex gap-2'>
          <CalendarButton
            icon={ChevronLeft}
            action={() => navigateMonth(-1)}
          />

          <CalendarButton
            icon={ChevronRight}
            action={() => navigateMonth(1)}
          />
        </div>
      </div>

      <div className='grid grid-cols-7 gap-[1px]'>
        {weekDays.map((day) => (
          <DaysContainer
            key={day}
            day={day}
            className='flex items-center justify-center text-xs font-semibold leading-[160%] text-grey-900'
          />
        ))}

        {days.map((day) => {
          const isToday = getIsToday(day);
          const isCurrentMonth = getIsDateInCurrentMonth(day);

          return (
            <DaysButton
              key={day.toISOString()}
              date={String(day.getDate())}
              isToday={isToday}
              isCurrentMonth={isCurrentMonth}
            />
          );
        })}
      </div>
    </div>
  );
}

function CalendarButton({ action, icon }: ICalendarButton) {
  const Icon = icon;

  return (
    <Button
      onClick={action}
      variant='ghost'
      className='size-5 flex items-center justify-center text-grey-400 rounded-[4px] hover:text-primary-600 hover:bg-transparent'
    >
      <Icon
        width={5}
        height={10}
        strokeWidth={2}
      />
    </Button>
  );
}

function DaysButton({ isToday = false, date, isCurrentMonth = false }: IDaysButton) {
  return (
    <DaysContainer
      day={date}
      className={cn('rounded-full p-2.5 text-xs leading-[160%] text-white', {
        'text-xs text-grey-900': !isToday,
        'bg-primary-600 font-bold shadow-[4px_8px_18px_0px_#2563EB4D]': isToday,
        'text-grey-400': !isCurrentMonth,
      })}
    />
  );
}

function DaysContainer({ day, className }: IDaysContainer) {
  return <div className={cn('w-full h-10 text-center', className)}>{day}</div>;
}

interface ICalendarButton {
  action: () => void;
  icon: LucideIcon;
}

interface IDaysContainer {
  day: string;
  className?: string;
}

interface IDaysButton {
  isToday?: boolean;
  date: string;
  isCurrentMonth?: boolean;
}
