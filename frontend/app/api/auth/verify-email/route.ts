import { type NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL } from '@/utils/config';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const backendRes = await fetch(`${BACKEND_URL}/auth/verify-email`, {
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

export const config = {
  maxDuration: 45,
};
