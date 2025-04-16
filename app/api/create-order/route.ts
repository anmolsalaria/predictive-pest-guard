import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // Ensure the request is JSON
    if (req.headers.get('content-type') !== 'application/json') {
      return NextResponse.json(
        { error: 'Content-Type must be application/json' },
        { status: 400 }
      );
    }

    const body = await req.json();
    console.log('Received request body:', body);

    const { amount, currency, metadata } = body;

    if (!amount || !currency) {
      return NextResponse.json(
        { error: 'Amount and currency are required' },
        { status: 400 }
      );
    }

    // Simulate order creation with a mock order ID
    const mockOrder = {
      id: `mock_order_${Date.now()}`,
      amount: amount * 100,
      currency,
      status: 'created',
    };

    return new NextResponse(
      JSON.stringify({
        orderId: mockOrder.id,
        amount: mockOrder.amount,
        currency: mockOrder.currency,
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
} 