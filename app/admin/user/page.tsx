import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default function AdminUser() {
  return (
    <div>
      <Header title="ユーザー登録画面" backHref="/admin" />
      <Container>ユーザー登録画面</Container>
    </div>
  );
}
