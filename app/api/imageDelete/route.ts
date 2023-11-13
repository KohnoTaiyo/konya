import { NextResponse } from "next/server";

import { r2 } from "@/lib/r2";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export async function DELETE(request: Request) {
  const { imageName } = await request.json();
  try {
    const res = await r2.send(
      new DeleteObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_R2_BUCKET,
        Key: imageName,
      }),
    );
    return NextResponse.json(res);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
