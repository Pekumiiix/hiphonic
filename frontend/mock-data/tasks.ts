import type { ITaskProps } from '@/types';

export const tasks: ITaskProps[] = [
  {
    title: 'Implement Login',
    category: 'design',
    description: 'Add Forgot password option when login & send email to reset password...',
    comment: 2,
    due_date: new Date('2026-01-10'),
    status: 'to-do',
  },
  {
    title: 'Implement Login 1',
    category: 'development',
    description: 'Add Forgot password option when login & send email to reset password...',
    comment: 2,
    due_date: new Date('2026-01-11'),
    status: 'in-progress',
  },
  {
    title: 'Implement Login 2',
    category: 'planning',
    description: 'Add Forgot password option when login & send email to reset password...',
    comment: 2,
    due_date: new Date('2026-01-12'),
    status: 'in-review',
  },
  {
    title: 'Implement Login 3',
    category: 'planning',
    description: 'Add Forgot password option when login & send email to reset password...',
    comment: 2,
    due_date: new Date('2026-01-13'),
    status: 'done',
  },
];
