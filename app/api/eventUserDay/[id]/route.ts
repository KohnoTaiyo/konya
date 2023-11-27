import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { isDone } = await request.json();
  const eventUserDay = await prisma.eventUserDay.update({
    where: { id: Number(params.id) },
    data: {
      isDone,
    },
  });
  return NextResponse.json(eventUserDay);
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const event = await prisma.eventUserDay.delete({
    where: {
      id: Number(params.id),
    },
  });
  return NextResponse.json(event);
}
