import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default function Admin() {
  return (
    <div>
      <Header title="管理画面" backHref="/" />
      <Container>
        <div className="flex justify-between gap-4">
          <Button text="ユーザー登録" href="admin/user" />
          <Button text="スケジュール登録" href="admin/schedule" />
        </div>
      </Container>
    </div>
  );
}
