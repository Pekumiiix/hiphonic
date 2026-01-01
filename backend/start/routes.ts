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
      .use(middleware.cookieAuth());
    router
      .get('/me', [() => import('#controllers/auth_controller'), 'me'])
      .use(middleware.cookieAuth());
    router
      .post('/sign-out', [() => import('#controllers/auth_controller'), 'signOut'])
      .use(middleware.cookieAuth());

    //Social Auth
    router.get('/google/redirect', [
      () => import('#controllers/social_auth_controller'),
      'googleRedirect',
    ]);
    router.get('google/callback', [
      () => import('#controllers/social_auth_controller'),
      'googleCallback',
    ]);
    router.get('facebook/redirect', [
      () => import('#controllers/social_auth_controller'),
      'facebookRedirect',
    ]);
    router.get('facebook/callback', [
      () => import('#controllers/social_auth_controller'),
      'facebookCallback',
    ]);
  })
  .prefix('/auth');

// Profile Routes
router
  .group(() => {
    router.patch('/avatar', [() => import('#controllers/profile_controllers'), 'updateAvatar']);
    router.patch('/username', [() => import('#controllers/profile_controllers'), 'updateUsername']);
    router.patch('/password', [() => import('#controllers/profile_controllers'), 'updatePassword']);
  })
  .use(middleware.cookieAuth())
  .prefix('/profile');
