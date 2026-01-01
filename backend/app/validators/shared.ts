import vine from '@vinejs/vine';

export const strongPasswordRule = vine
  .string()
  .minLength(8)
  .maxLength(32)
  .regex(/[a-z]/)
  .regex(/[A-Z]/)
  .regex(/[0-9]/)
  .regex(/[^a-zA-Z0-9]/);

export const passwordMessages = {
  minLength: 'Password must be at least 8 characters.',
  maxLength: 'Password cannot exceed 32 characters.',
  regex:
    'Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 special character.',
};
