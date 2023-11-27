import { prisma } from "@/lib/prisma";

import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

import { AdminEventList } from "./_component/AdminEventList";

export default async function UserSchedule({ params }: { params: { id: string } }) {
  const events = await prisma.eventUserDay.findMany({
    where: { userId: Number(params.id) },
    include: { event: true },
  });

  return (
    <div>
      <Header title="スケジュール編集画面" backHref={`/admin/${params.id}`} isHomeIcon />
      <Container>
        <AdminEventList events={events} />
        <Button
          text={`${events.length ? "" : "新規"}スケジュール追加`}
          href={`/admin/${params.id}/schedule/new`}
          addClassNames="h-16"
        />
      </Container>
    </div>
  );
}
