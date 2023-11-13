import { User } from "@prisma/client";

import { Container } from "@/components/Container/Container";
import { UserForm } from "@/components/Form";
import { Header } from "@/components/Header/Header";

export default async function UserEdit({ params }: { params: { id: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/${params.id}`, { cache: "no-store" });
  const user: User = await res.json();

  return (
    <div>
      <Header title="ユーザー編集画面" backHref={`/admin/${params.id}`} isHomeIcon />
      <Container>
        <UserForm user={user} />
      </Container>
    </div>
  );
}