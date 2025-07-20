/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router';
import db from '@adonisjs/lucid/services/db';
import { middleware } from './kernel.js';

// Server status routes
router.on('/').render('pages/home');
router.get('/db-check', async () => {
  const result = await db.rawQuery('SELECT NOW()');
  return result;
});

// Auth Routes
router
  .group(() => {
    router.post('/sign-in', [() => import('#controllers/auth_controller'), 'signIn']);
    router.post('/sign-up', [() => import('#controllers/auth_controller'), 'signUp']);
    router.post('/reset-password', [() => import('#controllers/auth_controller'), 'resetPassword']);
    router.post('/create-new-password', [
      () => import('#controllers/auth_controller'),
      'createNewPassword',
    ]);
    router.post('/verify-email', [() => import('#controllers/auth_controller'), 'verifyEmail']);
    router
      .post('/refresh', [() => import('#controllers/auth_controller'), 'refresh'])
      .use(middleware.auth());
    router.get('/me', [() => import('#controllers/auth_controller'), 'me']);
    router
      .delete('/signout', [() => import('#controllers/auth_controller'), 'signout'])
      .middleware(() => import('#middleware/auth_middleware'))
      .use(middleware.auth());
  })
  .prefix('/auth');
