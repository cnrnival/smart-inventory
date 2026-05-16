// frontend/src/app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersPath = path.join(process.cwd(), 'users.json');

function readUsersFile() {
  const data = fs.readFileSync(usersPath, 'utf8');
  return JSON.parse(data);
}

function writeUsersFile(data: any) {
  fs.writeFileSync(usersPath, JSON.stringify(data, null, 2));
}

// DELETE /api/users/:id
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = readUsersFile();
    const initialLength = data.users.length;
    data.users = data.users.filter((u: any) => u.id !== id);
    
    if (data.users.length === initialLength) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }
    
    writeUsersFile(data);
    return NextResponse.json({ message: 'Usuário removido' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao deletar usuário' }, { status: 500 });
  }
}