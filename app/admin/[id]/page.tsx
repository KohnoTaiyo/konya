import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default async function UserSelectEditType({ params }: { params: { id: string } }) {
  return (
    <div>
      <Header title="ユーザー編集画面" backHref="/admin" isHomeIcon />
      <Container>
        <div className="flex justify-between gap-4">
          <Button text="ユーザー編集" href={`/admin/${params.id}/user`} />
          <Button text="スケジュール編集" href={`/admin/${params.id}/schedule`} />
        </div>
      </Container>
    </div>
  );
}
