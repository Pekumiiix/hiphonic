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
router.post('/sign-in', [() => import('#controllers/auth_controller'), 'signIn']);
router.post('/sign-up', [() => import('#controllers/auth_controller'), 'signUp']);
router.post('/reset-password', [() => import('#controllers/auth_controller'), 'resetPassword']);
router.post('/create-new-password', [
  () => import('#controllers/auth_controller'),
  'createNewPassword',
]);
router
  .get('/me', [() => import('#controllers/auth_controller'), 'me'])
  .middleware(() => import('#middleware/auth_middleware'));
router
  .post('/logout', [() => import('#controllers/auth_controller'), 'logout'])
  .middleware(() => import('#middleware/auth_middleware'));

// Protected Routes
router.get('dashboard', () => {}).use(middleware.auth());
