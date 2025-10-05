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
      const { email, password, rememberMe } = request.only(['email', 'password', 'rememberMe']);

      const user = await User.verifyCredentials(email, password);

      if (user) {
        const tokenConfig = {
          name: rememberMe ? 'Remember Me Session' : 'Regular Session',
          expiresIn: rememberMe ? '30 days' : '7 days',
          abilities: ['*'],
        };

        const token = await User.accessTokens.create(user, tokenConfig.abilities, {
          name: tokenConfig.name,
          expiresIn: tokenConfig.expiresIn,
        });

        const tokenValue = token.value?.release();

        const responseData = {
          type: 'bearer',
          token: tokenValue,
          expiresAt: token.expiresAt?.toISOString(),
          rememberMe: rememberMe || false,
          user: {
            id: user.id,
            email: user.email,
            username: user.username,
            avatarUrl: user.avatarUrl,
          },
        };

        return response.ok(responseData);
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

      const { currentAccessToken: token } = user as User & { currentAccessToken?: AccessToken };

      return response.ok({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          avatarUrl: user.avatarUrl,
        },
        token: {
          name: token?.name,
          expiresAt: token?.expiresAt?.toISOString(),
          lastUsedAt: token?.lastUsedAt?.toISOString(),
          isExpired: token?.isExpired(),
        },
      });
    } catch (error) {
      return response.unauthorized({
        message: 'Unauthenticated',
        error: error.message,
      });
    }
  }

  async signout({ auth, response }: HttpContext) {
    try {
      const user = await auth.authenticateUsing(['api']);
      const { currentAccessToken } = user as User & { currentAccessToken?: { identifier: string } };

      if (currentAccessToken?.identifier) {
        await User.accessTokens.delete(user, currentAccessToken.identifier);
      }

      return response.ok({
        message: 'Logged out successfully',
      });
    } catch (error) {
      return response.unauthorized({
        message: 'Unable to logout',
        error: error.message,
      });
    }
  }

  async refresh({ auth, request, response }: HttpContext) {
    try {
      const { extendRememberMe } = await request.validateUsing(refreshValidator);
      const user = await auth.authenticateUsing(['api']);
      const { currentAccessToken: currentToken } = user as User & {
        currentAccessToken?: AccessToken;
      };

      if (!currentToken) {
        return response.unauthorized({ message: 'No current access token found' });
      }

      const newExpiration = extendRememberMe ? '30 days' : '7 days';
      const tokenName = extendRememberMe ? 'Extended Remember Me Session' : 'Refreshed Session';

      const newToken = await User.accessTokens.create(user, currentToken.abilities, {
        name: tokenName,
        expiresIn: newExpiration,
      });

      await User.accessTokens.delete(user, currentToken.identifier);

      return response.ok({
        type: 'bearer',
        token: newToken.value?.release(),
        expiresAt: newToken.expiresAt?.toISOString(),
        refreshed: true,
      });
    } catch {
      return response.unauthorized({
        message: 'Unable to refresh token',
      });
    }
  }
}
