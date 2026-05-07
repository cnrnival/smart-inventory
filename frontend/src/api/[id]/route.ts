import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'users.json');

function read() {
  const data = fs.readFileSync(usersPath, 'utf8');
  return JSON.parse(data);
}

function write(data: any) {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = read();
    const initialLength = data.users.length;
    data.users = data.users.filter((u: any) => u.id !== id);
    if (data.users.length === initialLength) {
      return NextResponse.json({ error: 'Não encontrado' }, { status: 404 });
    }
    write(data);
    return NextResponse.json({ message: 'Removido' }, { status: 200 });
  } catch {
    return NextResponse.json({ error: 'Erro' }, { status: 500 });
  }
}