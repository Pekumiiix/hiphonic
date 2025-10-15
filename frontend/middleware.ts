import { type NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*', '/admin/:path*'],
};

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('access_token')?.value;
  const signInUrl = new URL('/sign-in', request.url);

  // 1. If there's no token cookie at all, redirect immediately.
  if (!accessToken) {
    return NextResponse.redirect(signInUrl);
  }

  // 2. If a token exists, verify it by calling your backend.
  // We use the Next.js server as a proxy to securely forward the cookie.
  const verifyUrl = new URL('/api/auth/me', request.url);

  try {
    const response = await fetch(verifyUrl, {
      headers: {
        Cookie: `access_token=${accessToken}`,
      },
    });

    // 3. If the backend says the token is invalid (401), redirect.
    if (!response.ok) {
      return NextResponse.redirect(signInUrl);
    }
  } catch (error) {
    // If the API route itself fails, redirect.
    console.error('Error verifying token in middleware:', error);
    return NextResponse.redirect(signInUrl);
  }

  // 4. If the token is valid, allow the user to proceed.
  return NextResponse.next();
}
