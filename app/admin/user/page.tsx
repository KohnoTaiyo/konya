import { Container } from "@/components/Container/Container";
import { UserForm } from "@/components/Form";
import { Header } from "@/components/Header/Header";

export default async function UserNew() {
  return (
    <div>
      <Header title="ユーザー登録画面" backHref="/admin" isHomeIcon />
      <Container>
        <UserForm />
      </Container>
    </div>
  );
}
