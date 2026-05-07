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

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const email = searchParams.get('email');
    const password = searchParams.get('password');
    let { users } = read();
    if (email) users = users.filter((u: any) => u.email === email);
    if (password) users = users.filter((u: any) => u.password === password);
    return NextResponse.json(users);
  } catch {
    return NextResponse.json({ error: 'Erro' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = read();
    const newUser = { id: Math.random().toString(36).substr(2, 9), ...body };
    data.users.push(newUser);
    write(data);
    return NextResponse.json(newUser, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Erro' }, { status: 500 });
  }
}