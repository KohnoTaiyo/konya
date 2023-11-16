import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

// import { corsHeaders } from "../corsHeader";

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
