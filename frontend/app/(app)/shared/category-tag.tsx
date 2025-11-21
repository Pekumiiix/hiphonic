import type { CSSProperties } from 'react';
import type { IGoalCardProps, TCategory } from '@/types';
import { goalCategoryColors } from '../goals/components/goals-card';

export function TaskCategoryTag({ category }: { category: TCategory }) {
  return (
    <CategoryTag
      category={category}
      styles={{
        span: { background: categoryColor[category] },
        paragraph: { color: categoryColor[category] },
      }}
    />
  );
}

export function GoalCategoryTag({ category }: { category: IGoalCardProps['category'] }) {
  return (
    <CategoryTag
      category={category}
      styles={{
        span: { background: goalCategoryColors[category] },
        paragraph: { color: goalCategoryColors[category] },
      }}
    />
  );
}

function CategoryTag({ styles, category }: ICategoryTag) {
  return (
    <div className='flex items-center gap-1'>
      <span
        className='size-[6px] rounded-full'
        style={styles.span}
      />
      <p
        className='text-xs font-medium text-inherit capitalize'
        style={styles.paragraph}
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

interface ICategoryTag {
  styles: { span: CSSProperties; paragraph: CSSProperties };
  category: string;
}
