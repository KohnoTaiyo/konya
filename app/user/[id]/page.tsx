import { User } from "@prisma/client";

import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default async function UserPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${id}`, { cache: "no-store" });
  const user: User = await res.json();

  return (
    <div>
      <Header title={`${user.name}さんのページ`} backHref="/" />
      <Container>
        <div className="flex justify-between">
          <Button href={`/user/${params.id}/schedule`} text="スケジュール" />
        </div>
      </Container>
    </div>
  );
}
