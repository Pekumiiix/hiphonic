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
router.post('/verify-email', [() => import('#controllers/auth_controller'), 'verifyEmail']);
router.get('/me', [() => import('#controllers/auth_controller'), 'me']);
router
  .post('/logout', [() => import('#controllers/auth_controller'), 'logout'])
  .middleware(() => import('#middleware/auth_middleware'));
