import { r2 } from "@/lib/r2";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const uploadImage = async (file: File, imageName: string) => {
  try {
    const signedUrl = await getSignedUrl(
      r2,
      new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_R2_BUCKET,
        Key: imageName,
      }),
      { expiresIn: 60 },
    );

    return await fetch(signedUrl, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error uploading image");
  }
};
