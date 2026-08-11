import { NextResponse } from 'next/server';
import { readDB, writeDB } from '@/lib/db';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const products = await readDB('products.json');
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const products = await readDB('products.json');
    
    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    products[index] = {
      ...products[index],
      ...body,
      updatedAt: new Date().toISOString()
    };
    
    await writeDB('products.json', products);
    return NextResponse.json(products[index]);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const products = await readDB('products.json');
    const filteredProducts = products.filter(p => p.id !== id);
    
    if (products.length === filteredProducts.length) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    await writeDB('products.json', filteredProducts);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 });
  }
}
