import { defineConfig, services } from '@adonisjs/ally'
import env from '#start/env'

const allyConfig = defineConfig({
  facebook: services.facebook({
    clientId: env.get('FACEBOOK_CLIENT_ID'),
    clientSecret: env.get('FACEBOOK_CLIENT_SECRET'),
    callbackUrl: env.get('FACEBOOK_CALLBACK_URL'),
  }),
  google: services.google({
    clientId: env.get('GOOGLE_CLIENT_ID'),
    clientSecret: env.get('GOOGLE_CLIENT_SECRET'),
    callbackUrl: env.get('GOOGLE_CALLBACK_URL'),
  }),
})

export default allyConfig

declare module '@adonisjs/ally/types' {
  interface SocialProviders extends InferSocialProviders<typeof allyConfig> {}
}
