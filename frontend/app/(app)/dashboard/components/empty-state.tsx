import type { LucideIcon } from 'lucide-react';

export function EmptyState({ icon, title, description }: IEmptyState) {
  const Icon = icon;

  return (
    <div className='flex flex-col items-center justify-center py-2  md:col-span-3'>
      <div className='mb-3 flex items-center justify-center size-10 rounded-full bg-grey-100'>
        <Icon
          strokeWidth={1.5}
          className='size-5 text-grey-500'
        />
      </div>
      <p className='text-base font-semibold text-grey-900 mb-1'>{title}</p>
      <p className='text-sm text-grey-500 text-center max-w-2/3'>{description}</p>
    </div>
  );
}

interface IEmptyState {
  icon: LucideIcon;
  title: string;
  description: string;
}
