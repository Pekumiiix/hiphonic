import { z } from 'zod';

export const taskSchema = z.object({
  name: z.string(),
  assignee: z.array(z.string()),
  category: z.enum(['planning', 'development', 'design']),
  description: z.string(),
  due_date: z.date(),
});

export type TaskSchema = z.infer<typeof taskSchema>;
