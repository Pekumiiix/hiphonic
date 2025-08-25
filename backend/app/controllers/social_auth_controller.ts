import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SocialAuthController {
  async facebookRedirect({ ally }: HttpContext) {
    return ally.use('facebook').redirect()
  }

  async googleRedirect({ ally }: HttpContext) {
    return ally.use('google').redirect()
  }

  async facebookCallback({ ally, response }: HttpContext) {
    try {
      const facebook = ally.use('facebook')

      if (facebook.accessDenied()) {
        return 'Access was denied'
      }

      if (facebook.stateMisMatch()) {
        return 'Request expired. Retry again'
      }

      if (facebook.hasError()) {
        return facebook.getError()
      }

      const facebookUser = await facebook.user()

      let user = await User.findBy('email', facebookUser.email)

      if (!user) {
        user = await User.create({
          email: facebookUser.email,
          username: facebookUser.nickName || facebookUser.name,
          provider: 'google',
          providerId: facebookUser.id,
          avatarUrl: facebookUser.avatarUrl,
        })
      }

      const token = await User.accessTokens.create(user)

      return response.ok({
        type: 'bearer',
        token: token.value?.release(),
        expiresAt: token.expiresAt?.toISOString(),
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Something went wrong.',
        error: error.message,
      })
    }
  }

  async googleCallback({ ally, response }: HttpContext) {
    try {
      const google = ally.use('google')

      if (google.accessDenied()) {
        return 'Access was denied'
      }

      if (google.stateMisMatch()) {
        return 'Request expired. Retry again'
      }

      if (google.hasError()) {
        return google.getError()
      }

      const googleUser = await google.user()

      let user = await User.findBy('email', googleUser.email)

      if (!user) {
        user = await User.create({
          email: googleUser.email,
          username: googleUser.nickName || googleUser.name,
          provider: 'google',
          providerId: googleUser.id,
          avatarUrl: googleUser.avatarUrl,
        })
      }

      const token = await User.accessTokens.create(user)

      return response.ok({
        type: 'bearer',
        token: token.value?.release(),
        expiresAt: token.expiresAt?.toISOString(),
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          userAvatar: user.avatarUrl,
        },
      })
    } catch (error) {
      return response.internalServerError({
        message: 'Something went wrong.',
        error: error.message,
      })
    }
  }
}
