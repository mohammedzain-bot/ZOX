import { NextResponse } from 'next/server';
import { getCollection } from '@/lib/mongodb';
import crypto from 'crypto';

export async function GET() {
  try {
    const col = await getCollection('products');
    const products = await col.find({}).sort({ createdAt: -1 }).toArray();
    // Convert MongoDB _id to string and remove it
    const cleaned = products.map(({ _id, ...rest }) => rest);
    return NextResponse.json(cleaned);
  } catch (error) {
    console.error('GET /api/products error:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const col = await getCollection('products');

    const newProduct = {
      id: crypto.randomUUID(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await col.insertOne(newProduct);
    const { _id, ...result } = newProduct;
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error('POST /api/products error:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
