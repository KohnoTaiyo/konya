"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { deleteImage } from "@/hooks/deleteImage";
import { resizeValidateImage } from "@/hooks/resizeValidateImage";
import { uploadImage } from "@/hooks/uploadImage";
import { User } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/Button/Button";

type UserFormInputs = {
  name: string;
};

export function UserForm({ user }: { user?: User | null }) {
  const [image, setImage] = useState<File>();
  const [imageUrl, setImageUrl] = useState<string>(user?.image || "");
  const [errorMessages, setErrorMessages] = useState<{ image?: string; submit?: string }>();
  const [isEdit, setIsEdit] = useState<{ name: boolean; image: boolean }>({ name: false, image: false });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormInputs>({ defaultValues: { name: user?.name } });

  // 名前が変更されたらisEditを更新
  const nameWatch = watch("name");
  useEffect(() => {
    const name = user?.name ? nameWatch !== user.name : !!nameWatch;
    setIsEdit((prev) => ({ ...prev, name }));
  }, [nameWatch, user?.name]);

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

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    try {
      let imagePath: string | undefined;
      if (image && isEdit.image) {
        const imageName = crypto.randomUUID();
        const res = await uploadImage(image, imageName);
        if (res.ok) {
          imagePath = `${process.env.NEXT_PUBLIC_R2_IMAGE_URL}/${imageName}`;
        }

        // 画像の更新時に古い画像を削除
        if (user?.image) {
          await deleteImage(user.image.slice((process.env.NEXT_PUBLIC_R2_IMAGE_URL?.length || 0) + 1));
        }
      }

      await fetch(
        `${process.env.NEXT_PUBLIC_API_PREFIX}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/user${
          user ? `/${user.id}` : ""
        }`,
        {
          method: user ? "PUT" : "POST",
          body: JSON.stringify({ ...data, image: imagePath }),
        },
      ).then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        router.push("/");
      });
    } catch (e) {
      setErrorMessages({
        submit: "登録に失敗しました。少し時間をおいて再度お試しくいただくか、管理者にお問い合わせください。",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="name" className="mb-2 block">
          名前<span className="text-red">*</span>
        </label>
        <input
          type="text"
          id="name"
          className="input-text"
          {...register("name", {
            required: "名前は必須項目です",
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
        <Button text="送信" size="small" type="submit" disabled={!isEdit.image && !isEdit.name} />
        {errorMessages?.submit && <p className="text-red mt-2">{errorMessages?.submit}</p>}
      </div>
    </form>
  );
}
