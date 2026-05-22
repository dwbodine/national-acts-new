/* eslint-disable no-console */
import { NextResponse } from 'next/server';

interface RecaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

export const POST = async (request: Request) => {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { message: 'Missing token', success: false },
        { status: 400 },
      );
    }

    const secret = process.env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY;
    if (!secret) {
      return NextResponse.json(
        { message: 'Missing secret key', success: false },
        { status: 500 },
      );
    }

    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`;
    const res = await fetch(verifyUrl, { method: 'POST' });
    const data = (await res.json()) as RecaptchaResponse;

    if (data.success && data.score >= 0.5) {
      return NextResponse.json({ score: data.score, success: true });
    }
    return NextResponse.json(
      { errors: data['error-codes'], score: data.score || 0, success: false },
      { status: 400 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Server error', success: false },
      { status: 500 },
    );
  }
};
