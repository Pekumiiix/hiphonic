import { type NextRequest, NextResponse } from 'next/server';

import env from '@/config/env';

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  const body = await req.json();

  const backendRes = await fetch(`${env.apiUrl}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();
  return new NextResponse(JSON.stringify(data), {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
