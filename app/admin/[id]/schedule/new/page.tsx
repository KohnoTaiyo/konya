import { Event } from "@prisma/client";

import { Container } from "@/components/Container/Container";
import { ScheduleForm } from "@/components/Form";
import { Header } from "@/components/Header/Header";

export default async function UserAddSchedule({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/event`, { cache: "no-store" });
  const events: Event[] = await res.json();

  return (
    <div>
      <Header title="スケジュール追加画面" backHref={`/admin/${params.id}/schedule`} isHomeIcon />
      <Container>
        <ScheduleForm events={events} />
      </Container>
    </div>
  );
}
