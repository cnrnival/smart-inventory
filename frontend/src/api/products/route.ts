// frontend/src/app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Caminho para o products.json (na raiz do frontend)
const productsPath = path.join(process.cwd(), 'products.json');

// Função auxiliar para ler o JSON
function readProductsFile() {
  const data = fs.readFileSync(productsPath, 'utf8');
  return JSON.parse(data);
}

// Função auxiliar para salvar o JSON
function writeProductsFile(data: any) {
  fs.writeFileSync(productsPath, JSON.stringify(data, null, 2));
}

// GET /api/products - Retorna todos os produtos
export async function GET() {
  try {
    const { products } = readProductsFile();
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao ler produtos' }, { status: 500 });
  }
}

// POST /api/products - Adiciona um novo produto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readProductsFile();
    const newProduct = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
    };
    data.products.push(newProduct);
    writeProductsFile(data);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao adicionar produto' }, { status: 500 });
  }
}