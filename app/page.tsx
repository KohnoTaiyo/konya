import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <Header title="利用者選択画面" />
      <Container>
        <div className="grid grid-cols-4 gap-4">
          {users.map((user) => (
            <Link href={`/user/${user.id}`} key={user.id}>
              <div className="flex flex-col gap-2 items-center p-4 shadow-md rounded-md">
                <div className="w-full h-72 relative">
                  <Image
                    src={user.image || "/images/user.png"}
                    alt={`${user.image}の画像`}
                    fill
                    priority
                    style={{ objectFit: "cover" }}
                    sizes="100%"
                  />
                </div>
                <p className="font-bold text-large">{user.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
