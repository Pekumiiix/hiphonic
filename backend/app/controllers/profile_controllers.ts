import type { HttpContext } from '@adonisjs/core/http';
import hash from '@adonisjs/core/services/hash';
import UserService from '#services/user_service';
import {
  updateAvatarValidator,
  updatePasswordValidator,
  updateUsernameValidator,
} from '#validators/profile_validator';

export default class ProfileController {
  async updateAvatar({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(updateAvatarValidator);

    const user = await auth.authenticate();

    user.avatarUrl = payload.avatarUrl;

    await user.save();

    return response.ok({
      message: 'Avatar updated successfully.',
      data: { avatarUrl: user.avatarUrl },
    });
  }

  async updatePassword({ request, response, auth }: HttpContext) {
    const { currentPassword, newPassword } = await request.validateUsing(updatePasswordValidator);

    const user = await auth.authenticate();

    const isPasswordValid = await hash.verify(user.password || '', currentPassword);

    if (!isPasswordValid) {
      return response.badRequest({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;

    await user.save();

    return response.ok({ message: 'Password updated successfully' });
  }

  async updateUsername({ request, response, auth }: HttpContext) {
    const { username } = await request.validateUsing(updateUsernameValidator);

    const user = await auth.authenticate();

    await UserService.ensureUsernameIsUnique(username, user.id);

    user.username = username;

    await user.save();

    return response.ok({ message: 'Username updated successfully' });
  }
}
