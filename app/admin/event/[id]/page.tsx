import { prisma } from "@/lib/prisma";

import { Container } from "@/components/Container/Container";
import { EventForm } from "@/components/Form";
import { Header } from "@/components/Header/Header";

export default async function EventEdit({ params }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: { id: Number(params.id) },
  });

  return (
    <div>
      <Header title="イベント編集画面" backHref="/admin" isHomeIcon />
      <Container>
        <EventForm event={event} />
      </Container>
    </div>
  );
}
