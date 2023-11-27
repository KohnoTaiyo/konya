import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const eventUserDay = await prisma.eventUserDay.create({
    data: body,
  });
  return NextResponse.json(eventUserDay);
}

export async function PATCH(request: Request) {
  const { ids } = await request.json();
  const eventUserDay = await prisma.eventUserDay.updateMany({
    where: {
      id: {
        in: ids,
      },
    },
    data: {
      isDone: true,
    },
  });
  return NextResponse.json(eventUserDay);
}

export async function DELETE(request: Request) {
  const { ids } = await request.json();
  const event = await prisma.eventUserDay.deleteMany({
    where: {
      id: {
        in: ids,
      },
    },
  });
  return NextResponse.json(event);
}
