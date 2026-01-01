import { cuid } from '@adonisjs/core/helpers';
import type { HttpContext } from '@adonisjs/core/http';
import app from '@adonisjs/core/services/app';
import mail from '@adonisjs/mail/services/main';
import { DateTime } from 'luxon';
import User from '#models/user';
import AuthService from '#services/auth_service';
import UserService from '#services/user_service';
import env from '#start/env';
import {
  createNewPasswordValidator,
  refreshValidator,
  resetPasswordValidator,
  signInValidator,
  signUpValidator,
  verifyEmailValidator,
} from '#validators/auth_validator';

export default class AuthController {
  async signUp({ request, response }: HttpContext) {
    const data = await request.validateUsing(signUpValidator);

    try {
      await UserService.ensureUsernameIsUnique(data.username);

      await UserService.ensureEmailIsUnique(data.email);

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

      return response.ok({ message: 'Email verification link sent.' });
    } catch (_) {
      return response.internalServerError({
        message: 'Failed to create user.',
      });
    }
  }

  async verifyEmail({ request, response }: HttpContext) {
    const { token } = await request.validateUsing(verifyEmailValidator);

    try {
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
    } catch (_) {
      return response.internalServerError({
        message: 'Something went wrong on our end.',
      });
    }
  }

  async signIn({ request, response }: HttpContext) {
    const { email, password, rememberMe = false } = await request.validateUsing(signInValidator);

    try {
      const user = await User.verifyCredentials(email, password);

      const { tokenValue, maxAge } = await AuthService.generateSessionToken(user, rememberMe);

      response.cookie('access_token', tokenValue, {
        httpOnly: true,
        secure: app.inProduction,
        sameSite: 'lax',
        maxAge,
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
      if (error.code === 'E_INVALID_CREDENTIALS' || error.code === 'E_ROW_NOT_FOUND') {
        return response.unauthorized({ message: 'Invalid credentials' });
      }

      return response.internalServerError({
        message: 'Something went wrong on our end.',
      });
    }
  }

  async resetPassword({ request, response }: HttpContext) {
    const { email } = await request.validateUsing(resetPasswordValidator);

    try {
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
        message: 'Something went wrong on our end.',
      });
    }
  }

  async createNewPassword({ request, response }: HttpContext) {
    const { token, newPassword } = await request.validateUsing(createNewPasswordValidator);

    try {
      const user = await User.findBy('resetPasswordToken', token);

      if (!user || !user.resetPasswordExpiresAt || user.resetPasswordExpiresAt < DateTime.now()) {
        return response.badRequest({ message: 'Token is invalid or has expired.' });
      }

      user.password = newPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpiresAt = null;

      await user.save();

      return response.ok({ message: 'Password updated successfully.' });
    } catch (_) {
      return response.internalServerError({
        message: 'Something went wrong on our end.',
      });
    }
  }

  async me({ auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate();

      return response.ok({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
      });
    } catch (_) {
      return response.unauthorized({ message: 'User is unathorized.' });
    }
  }

  async signOut({ auth, response }: HttpContext) {
    try {
      const user = await auth.authenticate();

      const token = user.currentAccessToken;

      if (token) {
        await User.accessTokens.delete(user, token.identifier);
      }

      response.clearCookie('access_token');

      return response.ok({ message: 'Signed out successfully' });
    } catch (error) {
      response.clearCookie('access_token');

      return response.unauthorized({
        message: 'Unable to logout',
        error: error.message,
      });
    }
  }

  async refresh({ auth, response, request }: HttpContext) {
    const { extendRememberMe = false } = await request.validateUsing(refreshValidator);

    try {
      const user = await auth.authenticate();

      const { tokenValue, maxAge } = await AuthService.generateSessionToken(user, extendRememberMe);

      response.cookie('access_token', tokenValue, {
        httpOnly: true,
        secure: app.inProduction,
        sameSite: 'lax',
        maxAge,
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
