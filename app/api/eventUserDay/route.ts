import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();
  const eventUserDay = await prisma.eventUserDay.create({
    data: body,
  });
  return NextResponse.json(eventUserDay);
}
