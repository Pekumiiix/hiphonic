import { z } from 'zod';

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters long')
    .max(20, 'Username must be at most 20 characters long'),
});

export type UsernameData = z.infer<typeof usernameSchema>;
