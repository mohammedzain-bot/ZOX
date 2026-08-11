import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';
import crypto from 'crypto';

export async function GET() {
  try {
    const products = await readDB('products.json');
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const products = await readDB('products.json');
    
    const newProduct = {
      id: crypto.randomUUID(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    products.push(newProduct);
    await writeDB('products.json', products);
    
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
