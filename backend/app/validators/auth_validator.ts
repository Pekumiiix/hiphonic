import vine, { SimpleMessagesProvider } from '@vinejs/vine';
import { passwordMessages, strongPasswordRule } from './shared.js';

export const signUpValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    username: vine.string().trim().minLength(3),
    password: strongPasswordRule,
  }),
);

signUpValidator.messagesProvider = new SimpleMessagesProvider({
  required: 'The {{ field }} field is required.',
  email: 'Please enter a valid email address.',
  'password.minLength': passwordMessages.minLength,
  'password.maxLength': passwordMessages.maxLength,
  'password.regex': passwordMessages.regex,
});

export const signInValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
    rememberMe: vine.boolean().optional(),
  }),
);

signInValidator.messagesProvider = new SimpleMessagesProvider({
  required: 'The {{ field }} field is required.',
  email: 'Please enter a valid email address.',
  'password.string': 'Password is in an invalid format',
});

export const verifyEmailValidator = vine.compile(
  vine.object({
    token: vine.string(),
  }),
);

verifyEmailValidator.messagesProvider = new SimpleMessagesProvider({
  'token.required': 'Please provide a valid token.',
  'token.string': 'The token format is invalid.',
});

export const resetPasswordValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
  }),
);

resetPasswordValidator.messagesProvider = new SimpleMessagesProvider({
  'email.required': 'Provide a valid email address',
  'email.email': 'The {{ field }} must be a valid email address.',
});

export const createNewPasswordValidator = vine.compile(
  vine.object({
    token: vine.string(),
    newPassword: strongPasswordRule,
  }),
);

createNewPasswordValidator.messagesProvider = new SimpleMessagesProvider({
  required: 'The {{ field }} field is required.',
  'newPassword.minLength': passwordMessages.minLength,
  'newPassword.maxLength': passwordMessages.maxLength,
  'newPassword.regex': passwordMessages.regex,
});

export const refreshValidator = vine.compile(
  vine.object({
    extendRememberMe: vine.boolean().optional(),
  }),
);
