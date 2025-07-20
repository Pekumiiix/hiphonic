import vine from '@vinejs/vine';

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
    rememberMe: vine.boolean().optional(),
  }),
);

export const refreshValidator = vine.compile(
  vine.object({
    extendRememberMe: vine.boolean().optional(),
  }),
);
