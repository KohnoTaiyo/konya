import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default function Admin() {
  return (
    <div>
      <Header title="管理画面" backHref="/" isHomeIcon />
      <Container>
        <div className="flex justify-between gap-4">
          <Button text="ユーザー編集" href="admin/user" />
          <Button text="スケジュール編集" href="admin/schedule" />
        </div>
      </Container>
    </div>
  );
}
