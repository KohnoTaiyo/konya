import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default function AdminSchedule() {
  return (
    <div>
      <Header title="スケジュール登録画面" backHref="/admin" />
      <Container>スケジュール登録画面</Container>
    </div>
  );
}
