import { NextResponse } from 'next/server';
import { Resend } from "resend";
import { createResetToken, getUserByEmail } from '@/server/dbPassReset';
import { PasswordResetEmail } from '@/components/Mail/Password';

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request) {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ success: true });
    }

    const resetToken = await createResetToken(user._id);

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password/${resetToken}`;

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: 'Reset Your Password',
      react: PasswordResetEmail({ resetUrl }),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Password reset request error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
