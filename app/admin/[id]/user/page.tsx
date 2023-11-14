import { prisma } from "@/lib/prisma";

import { Container } from "@/components/Container/Container";
import { UserForm } from "@/components/Form";
import { Header } from "@/components/Header/Header";

export default async function UserEdit({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  return (
    <div>
      <Header title="ユーザー編集画面" backHref={`/admin/${params.id}`} isHomeIcon />
      <Container>
        <UserForm user={user} />
      </Container>
    </div>
  );
}
