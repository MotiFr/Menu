import { updatePassword, verifyResetToken } from '@/server/dbPassReset';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { token, password } = await request.json();
    
    if (!token || !password) {
      return NextResponse.json(
        { error: 'Token and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters' },
        { status: 400 }
      );
    }

    const user = await verifyResetToken(token);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    await updatePassword(user._id, password);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Password update error:', error);
    return NextResponse.json(
      { error: 'Failed to update password' },
      { status: 500 }
    );
  }
}
