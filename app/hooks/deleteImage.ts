import { r2 } from "@/lib/r2";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const deleteImage = async (imageName: string) => {
  try {
    return await r2.send(
      new DeleteObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_R2_BUCKET,
        Key: imageName,
      }),
    );
  } catch (error) {
    throw new Error("Error deleting image");
  }
};
