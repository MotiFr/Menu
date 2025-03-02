import { verifyResetToken } from '@/server/dbPassReset';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { token } = await request.json();
    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const user = await verifyResetToken(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    return NextResponse.json({ valid: true, email: user.email });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify token' },
      { status: 500 }
    );
  }
}