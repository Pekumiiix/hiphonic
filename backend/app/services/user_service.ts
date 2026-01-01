import { Exception } from '@adonisjs/core/exceptions';
import User from '#models/user';

export default class UserService {
  static async ensureUsernameIsUnique(username: string, excludeUserId?: number) {
    const query = User.query().where('username', username);

    if (excludeUserId) {
      query.whereNot('id', excludeUserId);
    }

    const user = await query.first();

    if (user) {
      throw new Exception('Username is already taken', { status: 409 });
    }
  }

  static async ensureEmailIsUnique(email: string) {
    const query = User.query().where('email', email);

    const user = await query.first();

    if (user) {
      throw new Exception('Email is already registered', { status: 409 });
    }
  }
}
