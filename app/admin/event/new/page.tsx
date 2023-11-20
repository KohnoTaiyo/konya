import { Container } from "@/components/Container/Container";
import { EventForm } from "@/components/Form";
import { Header } from "@/components/Header/Header";

export default async function EventNew() {
  return (
    <div>
      <Header title="イベント登録画面" backHref="/admin" isHomeIcon />
      <Container>
        <EventForm />
      </Container>
    </div>
  );
}
