import { format } from 'date-fns';
import { Calendar1 } from 'lucide-react';

export function RenderTaskDate({ date }: { date: Date }) {
  return (
    <div className='h-8 p-2 rounded-[8px] bg-grey-50 text-grey-900 font-semibold flex items-center gap-2 max-md:text-xs'>
      <Calendar1 size={20} />
      <p>{format(date, 'PPP')}</p>
    </div>
  );
}
