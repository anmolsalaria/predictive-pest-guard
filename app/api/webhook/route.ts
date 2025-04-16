import { NextResponse } from 'next/server';
import { sendProConfirmationEmail } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received webhook:', body);

    // Simulate payment verification
    const { userEmail, userName } = body.metadata;

    // Send confirmation email
    await sendProConfirmationEmail(userEmail, userName);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 