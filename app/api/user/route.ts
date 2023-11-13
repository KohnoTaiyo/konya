import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

export async function POST(request: Request) {
  const { name, image } = await request.json();
  const user = await prisma.user.create({
    data: {
      name,
      adminId: 1,
      image,
    },
  });
  return NextResponse.json(user);
}
