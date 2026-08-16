import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import crypto from 'crypto';

export async function GET() {
  try {
    const col = await getCollection('orders');
    const orders = await col.find({}).sort({ createdAt: -1 }).toArray();
    const cleaned = orders.map(({ _id, ...rest }) => rest);
    return NextResponse.json(cleaned);
  } catch (error) {
    console.error('GET /api/orders error:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const col = await getCollection('orders');

    const newOrder = {
      id: `ORD-${crypto.randomBytes(4).toString('hex').toUpperCase()}`,
      ...body,
      status: 'Pending',
      paymentStatus: 'Pending',
      createdAt: new Date().toISOString(),
    };

    await col.insertOne(newOrder);
    const { _id, ...result } = newOrder;
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/orders error:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
