import vine, { SimpleMessagesProvider } from '@vinejs/vine';
import { passwordMessages, strongPasswordRule } from './shared.js';

export const updateAvatarValidator = vine.compile(
  vine.object({
    avatarUrl: vine.string().url().trim(),
  }),
);

updateAvatarValidator.messagesProvider = new SimpleMessagesProvider({
  'avatarUrl.required': 'Provide a valid avatar URL.',
  'avatarUrl.string': 'The avatar URL is invalif',
});

export const updatePasswordValidator = vine.compile(
  vine.object({
    currentPassword: strongPasswordRule,
    newPassword: strongPasswordRule,
  }),
);

updatePasswordValidator.messagesProvider = new SimpleMessagesProvider({
  required: 'The {{ field }} field is required',
  'currentPassword.minLength': passwordMessages.minLength,
  'currentPassword.maxLength': passwordMessages.maxLength,
  'currentPassword.regex': passwordMessages.regex,
  'newPassword.minLength': passwordMessages.minLength,
  'newPassword.maxLength': passwordMessages.maxLength,
  'newPassword.regex': passwordMessages.regex,
});

export const updateUsernameValidator = vine.compile(
  vine.object({
    username: vine.string(),
  }),
);

updateUsernameValidator.messagesProvider = new SimpleMessagesProvider({
  'username.required': 'Provide a valid username.',
  'username.string': 'The username is in the wrong format.',
});
