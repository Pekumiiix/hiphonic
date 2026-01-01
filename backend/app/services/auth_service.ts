import { Exception } from '@adonisjs/core/exceptions';
import string from '@adonisjs/core/helpers/string';
import User from '#models/user';

export default class AuthService {
  static async generateSessionToken(user: User, rememberMe: boolean) {
    const expiresIn = rememberMe ? '30 days' : '7 days';
    const name = rememberMe ? 'Remembered Web Session' : 'Regular Web Session';
    const durationInMs = string.milliseconds.parse(expiresIn);

    const token = await User.accessTokens.create(user, ['*'], {
      name,
      expiresIn,
    });

    if (!token.value) {
      throw new Exception('Could not generate token secret', { status: 500 });
    }

    return { tokenValue: token.value.release(), maxAge: durationInMs };
  }
}
