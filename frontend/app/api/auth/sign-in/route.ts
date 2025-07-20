import { type NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL } from '@/utils/config';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const cookieHeader = req.headers.get('cookie') || '';

  const backendRes = await fetch(`${BACKEND_URL}/auth/sign-in`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookieHeader,
    },
    body: JSON.stringify(body),
    credentials: 'include',
  });

  const data = await backendRes.json();
  const response = new NextResponse(JSON.stringify(data), {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' },
  });

  const setCookie = backendRes.headers.get('set-cookie');
  if (setCookie) {
    response.headers.set('set-cookie', setCookie);
  }

  return response;
}

export const config = {
  maxDuration: 45,
};
