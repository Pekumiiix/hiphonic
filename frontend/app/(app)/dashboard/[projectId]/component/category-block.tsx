import type { TCategory } from '@/types';

export function CategoryBlock({ category }: { category: TCategory }) {
  return (
    <div className='flex items-center gap-1'>
      <span
        className='size-[6px] rounded-full'
        style={{ background: categoryColor[category] }}
      />
      <p
        className='text-xs font-medium text-inherit capitalize'
        style={{ color: categoryColor[category] }}
      >
        {category}
      </p>
    </div>
  );
}

const categoryColor: Record<TCategory, string> = {
  development: '#38BDF8',
  design: '#2563EB',
  planning: '#34D399',
};
