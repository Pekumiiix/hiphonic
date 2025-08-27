import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import env from '#start/env'

const tokenConfig = {
  name: 'Regular Session',
  expiresIn: '7 days',
  abilities: ['*'],
}

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
        return response.redirect(`${env.get('FRONTEND_URL')}/sign-in?error=access_denied`)
      }

      if (facebook.stateMisMatch() || facebook.hasError()) {
        return response.redirect(`${env.get('FRONTEND_URL')}/sign-in?error=oauth_failed`)
      }

      const facebookUser = await facebook.user()

      let user = await User.findBy('email', facebookUser.email)

      if (!user) {
        user = await User.create({
          email: facebookUser.email,
          username: facebookUser.nickName || facebookUser.name,
          provider: 'facebook',
          providerId: facebookUser.id,
          avatarUrl: facebookUser.avatarUrl,
          emailVerified: facebookUser.emailVerificationState === 'verified',
        })
      }

      const token = await User.accessTokens.create(user, tokenConfig.abilities, {
        name: tokenConfig.name,
        expiresIn: tokenConfig.expiresIn,
      })

      const tokenValue = token.value?.release()

      if (!tokenValue) {
        return response.badRequest('Failed to generate token')
      }

      response.cookie('auth_token', tokenValue, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
      })

      return response.redirect(`${env.get('FRONTEND_URL')}/dashboard`)
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
        return response.redirect(`${env.get('FRONTEND_URL')}/sign-in?error=access_denied`)
      }

      if (google.stateMisMatch() || google.hasError()) {
        return response.redirect(`${env.get('FRONTEND_URL')}/sign-in?error=oauth_failed`)
      }

      const googleUser = await google.user()

      let user = await User.findBy('provider_id', googleUser.id)

      if (!user) {
        user = await User.create({
          email: googleUser.email,
          username: googleUser.nickName || googleUser.name,
          provider: 'google',
          providerId: googleUser.id,
          avatarUrl: googleUser.avatarUrl,
          emailVerified: googleUser.emailVerificationState === 'verified',
        })
      }

      const token = await User.accessTokens.create(user, tokenConfig.abilities, {
        name: tokenConfig.name,
        expiresIn: tokenConfig.expiresIn,
      })

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
