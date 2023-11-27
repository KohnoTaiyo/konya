import { prisma } from "@/lib/prisma";

import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

import { EventList } from "./_components/EventList";

export default async function Schedule({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  const events = await prisma.eventUserDay.findMany({
    where: { userId: Number(params.id) },
    include: { event: true },
  });

  return user ? (
    <div>
      <Header title={`${user?.name}さんのページ\nスケジュール`} backHref={`/user/${params.id}`} />
      <Container>
        {events.length ? (
          <>
            <EventList events={events} />
            <p className="bg-gray p-4 text-center font-bold rounded-md">おしまい</p>
          </>
        ) : (
          <p>スケジュールが登録されていません</p>
        )}
      </Container>
    </div>
  ) : (
    <div>
      <Header title="存在しないユーザー" backHref="/" />
      <Container>
        <p>ユーザーが存在しません</p>
      </Container>
    </div>
  );
}
