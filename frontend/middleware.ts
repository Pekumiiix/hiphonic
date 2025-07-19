import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard'];

export async function middleware(request: NextRequest) {
  const isProtected = protectedRoutes.some((path) => request.nextUrl.pathname.startsWith(path));

  if (!isProtected) return NextResponse.next();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/me`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
      credentials: 'include',
    });

    if (!res.ok) {
      throw new Error('Not authenticated');
    }

    console.log(NextResponse.next());
    return NextResponse.next();
  } catch (err) {
    const loginUrl = new URL('/sign-in', request.url);
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
    console.log(err);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/dashboard'],
};
