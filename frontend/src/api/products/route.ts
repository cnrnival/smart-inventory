import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const productsPath = path.join(process.cwd(), 'products.json');

function read() {
  const data = fs.readFileSync(productsPath, 'utf8');
  return JSON.parse(data);
}

function write(data: any) {
  fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const { products } = read();
    return NextResponse.json(products);
  } catch {
    return NextResponse.json({ error: 'Erro' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = read();
    const newProduct = { id: Math.random().toString(36).substr(2, 9), ...body };
    data.products.push(newProduct);
    write(data);
    return NextResponse.json(newProduct, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro' }, { status: 500 });
  }
}