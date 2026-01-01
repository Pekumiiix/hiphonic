import { type NextRequest, NextResponse } from 'next/server';
import env from '@/config/env';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendRes = await fetch(`${env.apiUrl}/auth/create-new-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await backendRes.json();
  const response = new NextResponse(JSON.stringify(data), {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' },
  });

  return response;
}
