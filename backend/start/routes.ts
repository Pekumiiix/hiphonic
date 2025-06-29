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

router.get('/db-check', async () => {
  const result = await db.rawQuery('SELECT NOW()');
  return result;
});

router.on('/').render('pages/home');
router.post('/sign-in', [() => import('#controllers/auth_controller'), 'signIn']);
router.post('/sign-up', [() => import('#controllers/auth_controller'), 'signUp']);
router.post('/verify-email', [() => import('#controllers/auth_controller'), 'verifyEmail']);
router.post('/reset-password', [() => import('#controllers/auth_controller'), 'resetPassword']);
router
  .get('/me', [() => import('#controllers/auth_controller'), 'me'])
  .middleware(() => import('#middleware/auth_middleware'));
router
  .post('/logout', [() => import('#controllers/auth_controller'), 'logout'])
  .middleware(() => import('#middleware/auth_middleware'));
