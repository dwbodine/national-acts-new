/* eslint-disable no-console */
import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  try {
    const { name, email } = await req.json();

    // Replace with your Sendy installation URL and list ID
    const sendyUrl = process.env.NEXT_PUBLIC_SENDY_URL;
    const listId = process.env.NEXT_PUBLIC_SENDY_LIST_ID;

    if (!sendyUrl || !listId) {
      return NextResponse.json({ error: 'Sendy config missing' }, { status: 500 });
    }

    const formData = new URLSearchParams();
    formData.append('name', name || '');
    formData.append('email', email);
    formData.append('list', listId);
    formData.append('subform', 'yes');
    formData.append('boolean', 'true');

    const response = await fetch(`${sendyUrl}/subscribe`, {
      body: formData.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });

    const text = await response.text();

    if (text.trim() === 'true') {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ message: text, success: false });
  } catch (err) {
    console.error('Sendy subscribe error:', err);
    return NextResponse.json(
      { error: 'Internal server error', success: false },
      { status: 500 },
    );
  }
};
