import { z } from 'zod';

export const resetPasswordSchema = z.object({
  email: z
    .string({ required_error: 'Provide a valid email address.' })
    .email({ message: 'Please enter a valid email address.' }),
});

export type TSignUpData = z.infer<typeof resetPasswordSchema>;
