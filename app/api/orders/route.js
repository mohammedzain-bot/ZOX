import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import crypto from 'crypto';

export async function GET() {
  try {
    const orders = await readDB('orders.json');
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const orders = await readDB('orders.json');
    
    const newOrder = {
      id: `ORD-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
      ...body,
      status: 'Pending',
      paymentStatus: 'Pending',
      createdAt: new Date().toISOString(),
    };
    
    orders.push(newOrder);
    await writeDB('orders.json', orders);
    
    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
