import { z } from 'zod';
import env from '@/config/env';

export const signInSchema = z.object({
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
  rememberMe: z.boolean().optional(),
});

export const defaultSignInValue: SignInData = {
  email: env.isDev ? env.testEmail || '' : '',
  password: env.isDev ? env.testPassword || '' : '',
  rememberMe: false,
};

export type SignInData = z.infer<typeof signInSchema>;
