import { type NextRequest, NextResponse } from 'next/server';
import { BACKEND_URL } from '@/utils/config';

export async function DELETE(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  const backendRes = await fetch(`${BACKEND_URL}/auth/signout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      ...(authHeader ? { Authorization: authHeader } : {}),
    },
  });

  const data = await backendRes.json();
  return new NextResponse(JSON.stringify(data), {
    status: backendRes.status,
    headers: { 'Content-Type': 'application/json' },
  });
}
