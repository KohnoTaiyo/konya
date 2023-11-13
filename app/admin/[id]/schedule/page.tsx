import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default function UserSchedule({ params }: { params: { id: string } }) {
  return (
    <div>
      <Header title="スケジュール編集画面" backHref={`/admin/${params.id}`} isHomeIcon />
      <Container>
        <Button text="新規スケジュール追加" href={`/admin/${params.id}/schedule/new`} addClassNames="h-16" />
      </Container>
    </div>
  );
}
