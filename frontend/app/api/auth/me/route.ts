import { type NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL } from '@/utils/config';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  const backendRes = await fetch(`${BACKEND_URL}/auth/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
  });

  const data = await backendRes.json();
  const response = new NextResponse(JSON.stringify(data), {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
}
