import { useMemo } from 'react';
import type { Filter } from '@/components/ui/filters';
import type { ITaskCardProps, ITaskProps } from '@/types';

export const taskColumns = [
  { id: 'to-do', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'in-review', title: 'In Review' },
  { id: 'done', title: 'Done' },
] as const;

export function useTaskFiltering(tasks: ITaskProps[], filters: Filter[]) {
  return useMemo(() => {
    const filteredTasks = tasks.filter((task) => {
      if (filters.length === 0) return true;

      return filters.every((filter) => {
        const { field, operator, values } = filter;

        const taskValue = task[field as keyof ITaskProps];

        const isZeroValueOperator = ['isEmpty', 'isNotEmpty', 'is_empty', 'is_not_empty'].includes(
          operator,
        );

        if (!isZeroValueOperator && (!values || values.length === 0)) {
          return true;
        }

        switch (operator) {
          case 'contains':
            return String(taskValue).toLowerCase().includes(String(values[0]).toLowerCase());

          case 'not_contains':
            return !String(taskValue).toLowerCase().includes(String(values[0]).toLowerCase());

          case 'starts_with':
            return String(taskValue).toLowerCase().startsWith(String(values[0]).toLowerCase());

          case 'ends_with':
            return String(taskValue).toLowerCase().endsWith(String(values[0]).toLowerCase());

          case 'isExactly':
            return String(taskValue).toLowerCase() === String(values[0]).toLowerCase();

          case 'before':
            return taskValue instanceof Date && new Date(taskValue) < new Date(values[0] as string);

          case 'after':
            return taskValue instanceof Date && new Date(taskValue) > new Date(values[0] as string);

          case 'is':
            if (taskValue instanceof Date) {
              return values.includes(taskValue.toISOString().split('T')[0]);
            }
            return values.includes(String(taskValue));

          case 'is_not':
            if (taskValue instanceof Date) {
              return !values.includes(taskValue.toISOString().split('T')[0]);
            }
            return !values.includes(String(taskValue));

          case 'isEmpty':
          case 'is_empty':
            return (
              taskValue === null ||
              taskValue === undefined ||
              taskValue === '' ||
              (Array.isArray(taskValue) && taskValue.length === 0)
            );

          case 'isNotEmpty':
          case 'is_not_empty':
            return (
              taskValue !== null &&
              taskValue !== undefined &&
              taskValue !== '' &&
              (!Array.isArray(taskValue) || taskValue.length > 0)
            );

          default:
            return true;
        }
      });
    });

    const taskMap = new Map<string, ITaskCardProps[]>(taskColumns.map((col) => [col.id, []]));

    for (const task of filteredTasks) {
      const status = task.status as TaskStatus;
      const columnTasks = taskMap.get(status);
      if (columnTasks) columnTasks.push(task);
    }

    return taskMap;
  }, [tasks, filters]);
}

export type TaskStatus = 'to-do' | 'in-progress' | 'in-review' | 'done';
