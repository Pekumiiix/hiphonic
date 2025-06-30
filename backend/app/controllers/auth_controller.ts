import { cuid } from '@adonisjs/core/helpers';
import type { HttpContext } from '@adonisjs/core/http';
import mail from '@adonisjs/mail/services/main';
import { DateTime } from 'luxon';
import User from '#models/user';

export default class AuthController {
  async signUp({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password', 'username']);

      const existingUserByEmail = await User.findBy('email', data.email);
      if (existingUserByEmail) {
        return response.badRequest({
          message: 'Email is already registered',
        });
      }

      const existingUserByUsername = await User.findBy('username', data.username);
      if (existingUserByUsername) {
        return response.badRequest({
          message: 'Username is already taken',
        });
      }

      const user = await User.create(data);

      return response.created({
        message: 'User created successfully',
        user: user.serialize(),
      });
    } catch (error) {
      return response.internalServerError({
        message: 'Failed to create user',
        error: error.message,
      });
    }
  }

  async signIn({ request, response }: HttpContext) {
    try {
      const { email, password, rememberMe } = request.only(['email', 'password', 'rememberMe']);

      const user = await User.findByOrFail('email', email);

      const isValid = await user.verifyPassword(password);

      if (!isValid) {
        return response.unauthorized({ message: 'Invalid credentials' });
      }

      const token = await User.accessTokens.create(user);

      response.cookie('token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: rememberMe ? 60 * 60 * 24 * 5 : undefined,
        path: '/',
      });

      return { user: user.serialize() };
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.unauthorized({ message: 'Invalid credentials' });
      }
      return response.internalServerError({
        message: 'Failed to sign in',
        error: error.message,
      });
    }
  }

  async verifyEmail({ request, response }: HttpContext) {
    try {
      const { email } = request.only(['email']);

      const user = await User.findByOrFail('email', email);

      const token = cuid();
      const expiresAt = DateTime.now().plus({ minutes: 20 });

      user.resetPasswordToken = token;
      user.resetPasswordExpiresAt = expiresAt;
      await user.save();

      const resetLink = `https://localhost:3000/create-new-password?token=${token}`;

      await mail.send((message) => {
        message
          .to(email)
          .from('Amaopelumi96@gmail.com')
          .subject('Here is your link to reset your password.')
          .htmlView(
            "emails/reset_password", {
              username: user.username,
              resetLink,
              year: new Date().getFullYear()
            }
          );
      });

      return response.ok({ message: 'Email is tied to an account.', username: user.username });
    } catch (error) {
      console.error('Mail send error:', error);
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.unauthorized({ message: 'The email is not tied to any account.' });
      }
      return response.internalServerError({
        message: 'Something went wrong.',
        error: error.message,
      });
    }
  }

  async resetPassword({ request, response }: HttpContext) {
    const { token, newPassword } = request.only(['token', 'newPassword']);
    const user = await User.findBy('resetPasswordToken', token);

    if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < DateTime.now()) {
      return response.badRequest({ message: 'Token is invalid or has expired.' });
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpiresAt = null;
    await user.save();

    return response.ok({ message: 'Password updated successfully.' });
  }

  async me({ auth }: HttpContext) {
    await auth.use('api').authenticate();
    return auth.user;
  }

  async logout({ auth }: HttpContext) {
    await auth.use('api').authenticate();
    return { message: 'Logged out successfully' };
  }
}
