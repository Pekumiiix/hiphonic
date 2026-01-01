import { errors } from '@adonisjs/auth';
import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

export default class CookieAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, auth, response } = ctx;

    const tokenValue = request.cookie('access_token');

    if (!tokenValue) {
      return response.unauthorized({
        message: 'Unauthorized access.',
      });
    }

    try {
      request.request.headers = request.request.headers || {};
      request.request.headers.authorization = `Bearer ${tokenValue}`;

      await auth.use('api').authenticate();

      return await next();
    } catch (error) {
      if (error instanceof errors.E_UNAUTHORIZED_ACCESS) {
        return response.unauthorized({
          message: 'Unauthorized access: Invalid or expired token.',
        });
      }

      throw error;
    }
  }
}
