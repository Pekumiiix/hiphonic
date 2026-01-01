const env = {
  apiUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
  cloudinaryUrl: process.env.CLOUDINARY_URL,
  isDev: process.env.NODE_ENV === 'development',
  testEmail: process.env.TEST_EMAIL,
  testPassword: process.env.TEST_PASSWORD,
};

if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL is not set');
}

if (!process.env.CLOUDINARY_URL) {
  throw new Error('CLOUDINARY_URL is not set');
}

export default env;
