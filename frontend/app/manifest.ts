import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Hiphonic | Project Management Platform',
    short_name: 'Hiphonic',
    description:
      'Hiphonic is a modern project management platform designed to help teams collaborate, organize tasks, and boost productivity. Manage your projects, track progress, and achieve your goals efficiently.',
    start_url: '/dashboard',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    orientation: 'portrait',
    lang: 'en',
    scope: '/',
    icons: [
      {
        src: '/assets/logo.png',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/logo.png',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  };
}
