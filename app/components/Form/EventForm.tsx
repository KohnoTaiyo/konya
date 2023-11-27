"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { deleteImage } from "@/hooks/deleteImage";
import { resizeValidateImage } from "@/hooks/resizeValidateImage";
import { uploadImage } from "@/hooks/uploadImage";
import { Event } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/Button/Button";

type EventInputs = {
  name: string;
};

export function EventForm({ event }: { event?: Event | null }) {
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>(event?.image || "");
  const [errorMessages, setErrorMessages] = useState<{ image?: string; submit?: string }>();
  const [isEdit, setIsEdit] = useState<{ name: boolean; image: boolean }>({ name: false, image: false });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EventInputs>({ defaultValues: { name: event?.name } });

  const nameWatch = watch("name");
  useEffect(() => {
    const name = event?.name ? nameWatch !== event.name : !!nameWatch;
    setIsEdit((prev) => ({ ...prev, name }));
  }, [nameWatch, event?.name]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const targetImage = e.target.files[0];
    const res = await resizeValidateImage(targetImage);
    if (typeof res === "string") {
      setErrorMessages({ image: res });
    } else {
      setImage(res);
      const createImageUrl = URL.createObjectURL(res);
      setImageUrl(createImageUrl);
      setIsEdit((prev) => ({ ...prev, image: true }));
    }
  };

  const onSubmit: SubmitHandler<EventInputs> = async (data) => {
    try {
      if (!imageUrl) {
        setErrorMessages({ image: "画像を選択してください" });
        return;
      }
      setIsLoading(true);
      let imagePath: string | undefined;
      if (isEdit.image && image) {
        const imageName = crypto.randomUUID();
        const res = await uploadImage(image, imageName);
        if (res.ok) {
          imagePath = `${process.env.NEXT_PUBLIC_R2_IMAGE_URL}/${imageName}`;
        } else {
          throw new Error();
        }

        // 画像の更新時に古い画像を削除
        if (event?.image) {
          await deleteImage(event.image.slice((process.env.NEXT_PUBLIC_R2_IMAGE_URL?.length || 0) + 1));
        }
      }

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event${event ? `/${event.id}` : ""}`, {
        method: event ? "PATCH" : "POST",
        body: JSON.stringify({ ...data, image: imagePath }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        router.back();
      });
    } catch (e) {
      setErrorMessages({
        submit: "登録に失敗しました。少し時間をおいて再度お試しくいただくか、管理者にお問い合わせください。",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block">
          イベント名<span className="text-red">*</span>
        </label>
        <input
          type="text"
          id="name"
          className="input-text"
          {...register("name", {
            required: "イベント名は必須項目です",
            maxLength: { value: 50, message: "50文字以内で入力してください" },
          })}
        />
        {errors.name && <p className="text-red">{errors.name.message}</p>}
      </div>
      <label htmlFor="image" className="inline-block">
        <p className="mb-2">画像（jpeg, jpg, pngのみ）</p>
        {imageUrl ? (
          <div className="w-60 h-60 relative shadow-md rounded-md">
            <Image src={imageUrl} alt="アップロード画像" fill style={{ objectFit: "cover" }} />
          </div>
        ) : (
          <span className="bg-secondary py-2 px-4 rounded-md text-white cursor-pointer">追加</span>
        )}
        <input
          type="file"
          id="image"
          onChange={handleChange}
          accept="image/png, image/jpeg, image/jpg"
          className="hidden"
        />
        {errorMessages?.image && <p className="text-red mt-2">{errorMessages?.image}</p>}
      </label>
      <div className="mt-8">
        <Button
          text={isLoading ? "送信中..." : "送信"}
          size="small"
          type="submit"
          disabled={(!isEdit.image && !isEdit.name) || isLoading}
        />
        {errorMessages?.submit && <p className="text-red mt-2">{errorMessages?.submit}</p>}
      </div>
    </form>
  );
}
