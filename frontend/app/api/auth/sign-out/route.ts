import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import env from '@/config/env';

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();

  const incomingCookies = req.headers.get('cookie');

  const tokenCookie = cookieStore.get('access_token');
  const xsrfCookie = cookieStore.get('XSRF-TOKEN');

  if (!tokenCookie || !xsrfCookie || !incomingCookies) {
    return NextResponse.json({ message: 'No active session' }, { status: 401 });
  }

  try {
    const headers = new Headers();

    headers.set('Cookie', incomingCookies);
    headers.set('x-xsrf-token', xsrfCookie.value);

    const backendResponse = await fetch(`${env.apiUrl}/auth/sign-out`, {
      method: 'POST',
      headers: headers,
      credentials: 'include',
    });

    const backendData = await backendResponse.json();

    const response = NextResponse.json(backendData, {
      status: backendResponse.status,
    });

    if (backendResponse.ok) {
      response.cookies.set('access_token', '', { httpOnly: true, path: '/', maxAge: 0 });
    }

    return response;
  } catch (error) {
    console.error('Sign-out fetch error:', error);

    return NextResponse.json({ message: 'An unexpected network error occurred.' }, { status: 500 });
  }
}
