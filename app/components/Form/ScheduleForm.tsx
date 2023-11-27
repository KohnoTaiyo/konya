"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { TIMES } from "@/contents/times";
import { arrangeTime } from "@/hooks/arrangeTime";
import { Event, EventUserDay } from "@prisma/client";
import { SubmitHandler, useForm } from "react-hook-form";

import { Button } from "@/components/Button/Button";
import { ImageCard } from "@/components/ImageCard/ImageCard";

type UserFormInputs = {
  time: string;
};

export function ScheduleForm({ events, userId }: { events: Event[]; userId: string }) {
  const [selectedEventId, setSelectedEventId] = useState<number>();
  const [errorMessages, setErrorMessages] = useState<{ eventId?: string; submit?: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UserFormInputs>();

  const timeWatch = watch("time");
  const handleClick = useCallback((id: number) => setSelectedEventId(id), []);

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    setIsLoading(true);
    if (!selectedEventId) {
      setErrorMessages({ eventId: "イベントを選択してください" });
      return;
    }

    try {
      const postData: Pick<EventUserDay, "eventId" | "userId" | "time"> = {
        eventId: selectedEventId,
        userId: Number(userId),
        time: data.time,
      };

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/eventUserDay`, {
        method: "POST",
        body: JSON.stringify(postData),
      }).then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        router.push(`/admin/${userId}/schedule`);
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
        <label htmlFor="time" className="mb-2 block">
          時間<span className="text-red">*</span>
        </label>
        <select id="time" {...register("time", { required: "必須項目です" })} className="input-select">
          <option value="">選択してください</option>
          {TIMES.map((time) => (
            <option key={time.name} value={time.name}>
              {arrangeTime(time.name)}
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
      {errorMessages?.eventId && <p className="text-red mt-2">{errorMessages.eventId}</p>}
      <div className="mt-8">
        <Button
          text={isLoading ? "送信中..." : "送信"}
          size="small"
          type="submit"
          disabled={!timeWatch || !selectedEventId || isLoading}
        />
        {errorMessages?.submit && <p className="text-red mt-2">{errorMessages.submit}</p>}
      </div>
    </form>
  );
}
