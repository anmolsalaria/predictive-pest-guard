import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/razorpay';

export async function POST(request: Request) {
  try {
    const { amount, currency } = await request.json();
    
    const order = await createOrder(amount, currency);
    
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
} 