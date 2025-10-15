import { Exception } from '@adonisjs/core/exceptions';
import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

export default class CookieAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, auth } = ctx;

    const tokenValue = request.cookie('access_token');

    if (!tokenValue) {
      throw new Exception('Unauthorized access', { status: 401 });
    }

    try {
      request.request.headers = request.request.headers || {};
      request.request.headers.authorization = `Bearer ${tokenValue}`;

      await auth.use('api').authenticate();

      return await next();
    } catch (_) {
      throw new Exception('Unauthorized access: Invalid token', { status: 401 });
    }
  }
}
