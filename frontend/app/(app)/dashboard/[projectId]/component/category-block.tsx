import type { TCategory } from '@/types';
import { RenderCategoryColor } from '@/utils/render-category-color';

export function CategoryBlock({ category }: { category: TCategory }) {
  return (
    <div className='flex items-center gap-1'>
      <span
        className='size-[6px] rounded-full'
        style={{ background: RenderCategoryColor(category) }}
      />
      <p
        className='text-xs font-medium text-inherit capitalize'
        style={{ color: RenderCategoryColor(category) }}
      >
        {category}
      </p>
    </div>
  );
}
