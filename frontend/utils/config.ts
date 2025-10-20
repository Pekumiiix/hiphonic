if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  throw new Error('NEX_PUBLIC_BACKEND_URL is not set');
}

export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const isDevelopment = process.env.NODE_ENV === 'development';
