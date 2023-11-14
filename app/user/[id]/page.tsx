import { prisma } from "@/lib/prisma";

import { Button } from "@/components/Button/Button";
import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  return user ? (
    <div>
      <Header title={`${user.name}さんのページ`} backHref="/" />
      <Container>
        <div className="flex justify-between">
          <Button href={`/user/${params.id}/schedule`} text="スケジュール" />
        </div>
      </Container>
    </div>
  ) : (
    <div>
      <Header title="存在しないユーザー" backHref="/" />
      <Container>
        <p>ユーザーが存在しません</p>
      </Container>
    </div>
  );
}
