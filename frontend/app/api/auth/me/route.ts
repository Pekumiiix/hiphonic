import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { BACKEND_URL } from '@/utils/config';

export async function GET() {
  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get('access_token');

  if (!tokenCookie) {
    return new NextResponse(JSON.stringify({ message: 'Unauthorized: No token provided' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const headers = new Headers();

    headers.set('Cookie', `access_token=${tokenCookie.value}`);

    const backendRes = await fetch(`${BACKEND_URL}/auth/me`, {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    });

    if (!backendRes.ok) {
      return new NextResponse(JSON.stringify({ message: 'Authentication failed on backend' }), {
        status: backendRes.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data = await backendRes.json();
    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in /api/auth/me:', error);
    return new NextResponse(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
