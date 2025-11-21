import { z } from 'zod';

export const dialogSchema = z.object({
  name: z.string(),
  assignee: z.array(z.string()),
  category: z.string(),
  description: z.string(),
  due_date: z.date(),
});

export type DialogSchema = z.infer<typeof dialogSchema>;
