"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { arrangeTime } from "@/hooks/arrangeTime";
import { searchTimeImage } from "@/hooks/searchTimeImage";
import { Event, EventUserDay } from "@prisma/client";

import { ImageCard } from "@/components/ImageCard/ImageCard";
import { Modal } from "@/components/Modal/Modal";

type Events = (EventUserDay & { event: Event })[];

export function AdminEventList({ events }: { events: Events }) {
  const [modalText, setModalText] = useState<string>();
  const [deleteIds, setDeleteIds] = useState<number[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const formattedEvents = events.reduce((acc: { [key: string]: (typeof cur)[] }, cur) => {
    const timeKey = cur.time;
    if (!acc[timeKey]) {
      acc[timeKey] = [];
    }
    acc[timeKey].push(cur);
    return acc;
  }, {});

  const onCancel = () => setModalText("");

  const onConfirm = (time: string) => {
    setModalText(`${arrangeTime(time)}のスケジュールを全て削除してよろしいですか？`);
    const deleteIds = events.filter((event) => event.time === time).map((event) => event.id);
    setDeleteIds(deleteIds);
  };

  const onDeleteList = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_PREFIX}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/eventUserDay`, {
        method: "DELETE",
        body: JSON.stringify({ ids: deleteIds }),
      }).then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        setModalText("");
        router.refresh();
      });
    } catch (e) {
      setModalText("");
      setIsError(true);
    }
  };

  const onDeleteEventUserDay = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_PREFIX}${process.env.NEXT_PUBLIC_VERCEL_URL}/api/eventUserDay/${id}`, {
        method: "DELETE",
      }).then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        router.refresh();
      });
    } catch (e) {
      setIsError(true);
    }
  };

  return (
    <>
      {Object.keys(formattedEvents).map((key) => (
        <div className="flex gap-2 pb-2 mb-2 border-b border-gray items-start last-of-type:border-0" key={key}>
          <ImageCard
            image={searchTimeImage(key)}
            name={arrangeTime(key)}
            addClassNames="w-24"
            onDelete={() => onConfirm(key)}
          />
          <div className="grid grid-cols-3 gap-2 flex-1">
            {formattedEvents[key].map((data) => (
              <ImageCard
                key={data.id}
                image={data.event.image}
                name={data.event.name}
                onDelete={() => onDeleteEventUserDay(data.id)}
                isTranslucent={data.isDone}
              />
            ))}
          </div>
          {modalText && <Modal text={modalText} onCancel={onCancel} onApproval={onDeleteList} />}
        </div>
      ))}
      {isError && <p className="text-red mt-2 mb-2">削除に失敗しました。少し時間をおいて再度お試しください。</p>}
    </>
  );
}
