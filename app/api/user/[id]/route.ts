import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const users = await prisma.user.update({
    where: { id: Number(params.id) },
    data: body,
  });
  return NextResponse.json(users);
}
