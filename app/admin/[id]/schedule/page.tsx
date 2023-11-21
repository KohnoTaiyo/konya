import { arrangeTime } from "@/hooks/arrangeTime";
import { searchTimeImage } from "@/hooks/searchTimeImage";
import { prisma } from "@/lib/prisma";

import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";
import { ImageCard } from "@/components/ImageCard/ImageCard";

export default async function UserSchedule({ params }: { params: { id: string } }) {
  const events = await prisma.eventUserDay.findMany({
    where: { userId: Number(params.id) },
    include: { event: true },
  });

  return (
    <div>
      <Header title="スケジュール編集画面" backHref={`/admin/${params.id}`} isHomeIcon />
      <Container>
        {events.map((event) => (
          <div className="flex" key={event.id}>
            <ImageCard image={searchTimeImage(event.time)} name={arrangeTime(event.time)} />
            <ImageCard image={event.event.image} name={event.event.name} />
          </div>
        ))}
        <Button
          text={`${events.length ? "" : "新規"}スケジュール追加`}
          href={`/admin/${params.id}/schedule/new`}
          addClassNames="h-16"
        />
      </Container>
    </div>
  );
}
