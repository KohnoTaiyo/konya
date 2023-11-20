import { prisma } from "@/lib/prisma";

import { Container } from "@/components/Container/Container";
import { ScheduleForm } from "@/components/Form";
import { Header } from "@/components/Header/Header";

export default async function UserAddSchedule({ params }: { params: { id: string } }) {
  const events = await prisma.event.findMany({
    where: { adminId: 1 },
  });

  return (
    <div>
      <Header title="スケジュール追加画面" backHref={`/admin/${params.id}/schedule`} isHomeIcon />
      <Container>
        <ScheduleForm events={events} />
      </Container>
    </div>
  );
}
