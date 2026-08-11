import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function PUT(request, { params }) {
  try {
    const body = await request.json();
    const orders = await readDB('orders.json');
    
    const index = orders.findIndex(o => o.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    
    orders[index] = {
      ...orders[index],
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    await writeDB('orders.json', orders);
    return NextResponse.json(orders[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
