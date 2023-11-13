import imageCompression from "browser-image-compression";

export const resizeValidateImage = async (file: File): Promise<string | File> => {
  const allowedImageExtensions = ["image/png", "image/jpeg", "image/jpg"];
  if (!allowedImageExtensions.includes(file.type)) {
    return "画像はjpeg, jpg, pngのみアップロード可能です";
  }

  try {
    const compressedImage = await imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 600,
      useWebWorker: true,
    });
    return compressedImage;
  } catch (e) {
    return "画像のリサイズに失敗しました";
  }
};
