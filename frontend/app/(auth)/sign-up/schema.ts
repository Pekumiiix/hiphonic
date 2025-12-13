import { z } from 'zod';

export const signUpSchema = z.object({
  username: z
    .string({ required_error: 'Provide a username.' })
    .min(3, { message: 'Username must be at least 3 characters long.' }),
  email: z
    .string({ required_error: 'Provide a valid email address.' })
    .email({ message: 'Please enter a valid email address.' }),
  password: z
    .string({ required_error: 'Provide a valid password.' })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Password must contain at least one special character',
    }),
  termsAccepted: z.literal(true, {
    errorMap: () => ({
      message: 'You must accept the terms and conditions to continue.',
    }),
  }),
});

export type SignUpData = z.infer<typeof signUpSchema>;
