import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const users = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });
  return NextResponse.json(users);
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const users = await prisma.user.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(users);
}