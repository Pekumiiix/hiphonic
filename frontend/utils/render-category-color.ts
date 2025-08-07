import type { TCategory } from '@/types';

export function RenderCategoryColor(category: TCategory) {
  if (category === 'development') return '#38BDF8';

  if (category === 'design') {
    return '#2563EB';
  }

  return '#34D399';
}
