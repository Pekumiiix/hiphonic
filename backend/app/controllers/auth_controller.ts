import type { AccessToken } from '@adonisjs/auth/access_tokens';
import { cuid } from '@adonisjs/core/helpers';
import type { HttpContext } from '@adonisjs/core/http';
import mail from '@adonisjs/mail/services/main';
import { DateTime } from 'luxon';
import User from '#models/user';
import env from '#start/env';
import { refreshValidator } from '#validators/auth_validator';

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

      const verificationLink = `${env.get('FRONTEND_URL')}/verify-email?token=${verificationToken}`;

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
      return response.internalServerError({
        message: 'Failed to create user',
        error: error.message,
      });
    }
  }

  async verifyEmail({ request, response }: HttpContext) {
    try {
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
    } catch (error) {
      return response.internalServerError({
        message: 'Something went wrong.',
        error: error.message,
      });
    }
  }

  async signIn({ request, response }: HttpContext) {
    try {
      const {
        email,
        password,
        rememberMe = false,
      } = request.only(['email', 'password', 'rememberMe']);

      const user = await User.verifyCredentials(email, password);

      const sessionDuration = rememberMe ? '30 days' : '7 days';
      const sessionName = rememberMe ? 'Remembered Web Session' : 'Regular Web Session';

      const token = await User.accessTokens.create(user, ['*'], {
        name: sessionName,
        expiresIn: sessionDuration,
      });

      const tokenValue = token.value?.release();

      response.cookie('access_token', tokenValue, {
        httpOnly: true,
        secure: env.get('NODE_ENV') === 'production',
        sameSite: 'lax',
        maxAge: sessionDuration,
        path: '/',
      });

      return response.ok({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
      });
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

      const resetLink = `${env.get('FRONTEND_URL')}/create-new-password?token=${token}`;

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

      return response.ok({ message: 'Email sent successfully.' });
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
    try {
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
    } catch (error) {
      return response.internalServerError({
        message: 'Something went wrong.',
        error: error.message,
      });
    }
  }

  async me({ auth, response }: HttpContext) {
    try {
      const user = await auth.authenticateUsing(['api']);

      return response.ok({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
      });
    } catch (_) {
      return response.unauthorized({ message: 'Unauthenticated' });
    }
  }

  async signout({ auth, response }: HttpContext) {
    try {
      const user = await auth.authenticateUsing(['api']);

      const token = (auth.user as User & { currentAccessToken: AccessToken }).currentAccessToken;

      if (token) {
        await User.accessTokens.delete(user, token.identifier);
      }

      response.clearCookie('access_token');

      return response.ok({ message: 'Logged out successfully' });
    } catch (error) {
      response.clearCookie('access_token');

      return response.unauthorized({
        message: 'Unable to logout',
        error: error.message,
      });
    }
  }

  async refresh({ auth, response, request }: HttpContext) {
    try {
      const { extendRememberMe = false } = await request.validateUsing(refreshValidator);

      const user = auth.getUserOrFail();

      const sessionDuration = extendRememberMe ? '30 days' : '7 days';
      const sessionName = extendRememberMe ? 'Remembered Web Session' : 'Regular Web Session';

      const newToken = await User.accessTokens.create(user, ['*'], {
        expiresIn: sessionDuration,
        name: sessionName,
      });

      const tokenValue = newToken.value?.release();

      response.cookie('access_token', tokenValue, {
        httpOnly: true,
        secure: env.get('NODE_ENV') === 'production',
        sameSite: 'lax',
        maxAge: '30d',
        path: '/',
      });

      return response.ok({
        message: 'Token refreshed successfully.',
      });
    } catch {
      return response.unauthorized({
        message: 'Unable to refresh token',
      });
    }
  }
}
