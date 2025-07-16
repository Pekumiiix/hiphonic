import { cuid } from '@adonisjs/core/helpers';
import type { HttpContext } from '@adonisjs/core/http';
import mail from '@adonisjs/mail/services/main';
import { DateTime } from 'luxon';
import User from '#models/user';

export default class AuthController {
  async signUp({ request, response }: HttpContext) {
    try {
      const data = request.only(['email', 'password', 'username']);

      const existingUserByUsername = await User.findBy('username', data.username);
      if (existingUserByUsername) {
        return response.badRequest({
          message: 'Username is already taken',
        });
      }

      const existingUserByEmail = await User.findBy('email', data.email);
      if (existingUserByEmail) {
        return response.badRequest({
          message: 'Email is already registered',
        });
      }

      const user = await User.create(data);

      const verificationToken = cuid();
      const verificationExpiresAt = DateTime.now().plus({ hours: 24 });

      user.emailVerificationToken = verificationToken;
      user.emailVerificationExpiresAt = verificationExpiresAt;
      await user.save();

      const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;

      await mail.send((message) => {
        message
          .to(user.email)
          .from('Amaopelumi96@gmail.com')
          .subject('Verify your email address')
          .htmlView('emails/verify_email', {
            name: user.username,
            link: verificationLink,
          });
      });

      return response.ok({ message: 'Email verification link sent' });
    } catch (error) {
      console.error(error);
      return response.internalServerError({
        message: 'Failed to create user',
        error: error.message,
      });
    }
  }

  async verifyEmail({ request, response }: HttpContext) {
    const { token } = request.only(['token']);
    const user = await User.findBy('emailVerificationToken', token);

    if (
      !user ||
      !user.emailVerificationExpiresAt ||
      user.emailVerificationExpiresAt < DateTime.now()
    ) {
      return response.badRequest({ message: 'Token is invalid or has expired.' });
    }

    user.emailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpiresAt = null;
    await user.save();

    return response.ok({ message: 'Email verified successfully.' });
  }

  async signIn({ request, response, auth }: HttpContext) {
    try {
      const { email, password, rememberMe } = request.only(['email', 'password', 'rememberMe']);

      const user = await User.verifyCredentials(email, password);

      if (user) {
        await auth.use('web').login(user, rememberMe);
      }
    } catch (error) {
      if (error.code === 'E_INVALID_CREDENTIALS') {
        return response.unauthorized({ message: 'Invalid credentials' });
      }
      return response.internalServerError({
        message: 'Something went wrong.',
        error: error.message,
      });
    }
  }

  async resetPassword({ request, response }: HttpContext) {
    try {
      const { email } = request.only(['email']);

      const user = await User.findByOrFail('email', email);

      const token = cuid();
      const expiresAt = DateTime.now().plus({ minutes: 20 });

      user.resetPasswordToken = token;
      user.resetPasswordExpiresAt = expiresAt;
      await user.save();

      const resetLink = `http://localhost:3000/create-new-password?token=${token}`;

      await mail.send((message) => {
        message
          .to(email)
          .from('Amaopelumi96@gmail.com')
          .subject('Reset your password.')
          .htmlView('emails/reset_password', {
            email: user.email,
            link: resetLink,
          });
      });

      return response.ok({ message: 'Reset email sent if account exists.' });
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.unauthorized({ message: 'This email is not tied to any account.' });
      }
      return response.internalServerError({
        message: 'Something went wrong.',
        error: error.message,
      });
    }
  }

  async createNewPassword({ request, response }: HttpContext) {
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
    await auth.use('web').authenticate();
    return auth.user;
  }

  async logout({ auth }: HttpContext) {
    await auth.use('web').logout();
    return { message: 'Logged out successfully' };
  }
}
