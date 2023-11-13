import { NextResponse } from "next/server";

import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function POST(request: Request) {
  const { imageName } = await request.json();
  try {
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_R2_BUCKET,
        Key: imageName,
      }),
      { expiresIn: 60 },
    );

    return NextResponse.json({ url: signedUrl });
  } catch (error) {
    return NextResponse.json({ error });
  }
}
