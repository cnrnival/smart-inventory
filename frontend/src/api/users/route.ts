// frontend/src/app/api/users/route.ts
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

// GET /api/users - Retorna todos os usuários ou filtra por email/senha (query params)
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    
    let { users } = readUsersFile();
    
    if (email) users = users.filter((u: any) => u.email === email);
    if (password) users = users.filter((u: any) => u.password === password);
    
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao ler usuários' }, { status: 500 });
  }
}

// POST /api/users - Registra um novo usuário
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = readUsersFile();
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      ...body,
    };
    data.users.push(newUser);
    writeUsersFile(data);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao criar usuário' }, { status: 500 });
  }
}