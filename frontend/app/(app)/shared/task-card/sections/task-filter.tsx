import { Calendar, Funnel, FunnelX, List, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type Filter, type FilterFieldConfig, Filters } from '@/components/ui/filters';

export function TaskFilter({ filters, onFiltersChange }: ITaskFilterProps) {
  const fields: FilterFieldConfig[] = [
    {
      group: 'Basic',
      fields: [
        {
          key: 'title',
          label: 'Text',
          type: 'text',
          icon: <Type />,
          placeholder: 'Search title...',
        },
      ],
    },
    {
      group: 'Select',
      fields: [
        {
          key: 'category',
          label: 'Category',
          icon: <List />,
          placeholder: 'Category',
          type: 'select',
          searchable: false,
          className: 'w-[200px]',
          options: [
            { value: 'design', label: 'Design' },
            { value: 'development', label: 'Development' },
            {
              value: 'planning',
              label: 'Planning',
            },
          ],
        },
      ],
    },
    {
      group: 'Date and time',
      fields: [
        {
          key: 'due_date',
          label: 'Due Date',
          icon: <Calendar />,
          type: 'date',
          className: 'w-36',
        },
      ],
    },
  ];

  return (
    <div className='max-lg:w-full flex flex-col lg:flex-row items-end lg:items-center gap-2.5'>
      <div className='flex'>
        <Filters
          filters={filters}
          fields={fields}
          variant='outline'
          onChange={onFiltersChange}
          addButtonText='Filter'
          addButtonIcon={<Funnel />}
          showAddButton={filters.length === 0}
          addButtonClassName='h-10 w-fit rounded-[8px] py-2 px-3 flex items-center gap-2 text-sm font-medium leading-[160%] hover:bg-primary-50 border-none shadow-none'
        />
      </div>

      {filters.length > 0 && (
        <Button
          variant='outline'
          onClick={() => onFiltersChange([])}
        >
          <FunnelX /> Clear
        </Button>
      )}
    </div>
  );
}

interface ITaskFilterProps {
  filters: Filter[];
  onFiltersChange: (filters: Filter[]) => void;
}
