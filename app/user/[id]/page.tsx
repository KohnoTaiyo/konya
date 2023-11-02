import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default function User({ params }: { params: { id: string } }) {
  return (
    <div>
      <Header title={`${params.id}さんのページ`} backHref="/" />
      <Container>
        <div className="flex justify-between">
          <Button href={`/user/${params.id}/schedule`} text="スケジュール" />
        </div>
      </Container>
    </div>
  );
}
