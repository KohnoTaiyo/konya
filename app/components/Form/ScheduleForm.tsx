"use client";

// import { useEffect, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import Link from "next/link";

import { TIMES } from "@/contents/times";
// import { resizeValidateImage } from "@/hooks/resizeValidateImage";
import { Event } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/Button/Button";
import { ImageCard } from "@/components/ImageCard/ImageCard";

type UserFormInputs = {
  time: string;
  eventId: number;
};

export function ScheduleForm({ events }: { events: Event[] }) {
  const [selectedEventId, setSelectedEventId] = useState<number>();
  // const [image, setImage] = useState<File>();
  // const [imageUrl, setImageUrl] = useState<string>(user?.image || "");
  // const [errorMessages, setErrorMessages] = useState<{ image?: string; submit?: string }>();
  // const [isEdit, setIsEdit] = useState<{ name: boolean; image: boolean }>({ name: false, image: false });
  // const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>();

  const handleClick = useCallback((id: number) => setSelectedEventId(id), []);

  console.log(selectedEventId);

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    console.log(data);
    // try {
    //   let imagePath: string | undefined;
    //   if (image && isEdit.image) {
    //     const imageName = crypto.randomUUID();
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/imageUploadUrl`, {
    //       method: "POST",
    //       body: JSON.stringify({ imageName }),
    //     });
    //     const { url } = await response.json();
    //     await fetch(url, {
    //       method: "PUT",
    //       body: image,
    //       headers: {
    //         "Content-Type": image.type,
    //       },
    //     }).then((res) => {
    //       if (!res.ok) {
    //         throw new Error();
    //       }
    //       imagePath = `${process.env.NEXT_PUBLIC_R2_IMAGE_URL}/${imageName}`;
    //     });

    //     // 画像の更新時に古い画像を削除
    //     if (user?.image) {
    //       await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/imageDelete`, {
    //         method: "DELETE",
    //         body: JSON.stringify({
    //           imageName: user.image.slice((process.env.NEXT_PUBLIC_R2_IMAGE_URL?.length || 0) + 1),
    //         }),
    //       });
    //     }
    //   }

    //   await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user${user ? `/${user.id}` : ""}`, {
    //     method: user ? "PUT" : "POST",
    //     body: JSON.stringify({ ...data, image: imagePath }),
    //   }).then((res) => {
    //     if (!res.ok) {
    //       throw new Error();
    //     }
    //     router.push("/");
    //   });
    // } catch (e) {
    //   setErrorMessages({
    //     submit: "登録に失敗しました。少し時間をおいて再度お試しくいただくか、管理者にお問い合わせください。",
    //   });
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label htmlFor="time" className="mb-2 block">
          時間<span className="text-red">*</span>
        </label>
        <select id="time" {...register("time", { required: "必須項目です" })} className="input-select">
          <option value="">選択してください</option>
          {TIMES.map((time) => (
            <option key={time.name} value={time.name}>
              {time.name}
            </option>
          ))}
        </select>
        {errors.time && <p className="text-red">{errors.time.message}</p>}
      </div>
      <label htmlFor="image" className="mb-2 block">
        イベント名<span className="text-red">*</span>
      </label>
      <div className="grid grid-cols-3 gap-4">
        <Link href="/admin/event/new">
          <ImageCard name="イベント追加" isAddType />
        </Link>
        {events.map((event, i) => (
          <div key={event.id} onClick={() => handleClick(event.id)}>
            <ImageCard name={event.name} image={event.image} isSelected={i + 1 === selectedEventId} />
          </div>
        ))}
      </div>
      {/* <label htmlFor="image" className="inline-block">
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
      </label> */}
      <div className="mt-8">
        {/* <Button text="送信" size="small" type="submit" disabled={!isEdit.image && !isEdit.name} /> */}
        <Button text="送信" size="small" type="submit" />
        {/* {errorMessages?.submit && <p className="text-red mt-2">{errorMessages?.submit}</p>} */}
      </div>
    </form>
  );
}
