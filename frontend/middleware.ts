import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { BACKEND_URL } from './utils/config';

const protectedRoutes = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const isProtected = protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  const token =
    request.cookies.get('auth_token')?.value ||
    request.headers.get('authorization')?.replace('Bearer ', '');

  if (!token) {
    const loginUrl = new URL('/sign-in', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const res = await fetch(`${BACKEND_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Not authenticated');
    }

    return NextResponse.next();
  } catch (_err) {
    const loginUrl = new URL('/sign-in', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/dashboard'],
};
