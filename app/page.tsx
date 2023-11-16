import { cache } from "react";
import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export const revalidate = 0;

export default async function Home() {
  const cacheUsers = cache(async () => await prisma.user.findMany());
  const users = await cacheUsers();

  return (
    <div>
      <Header title="利用者選択画面" />
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <Link href={`/user/${user.id}`} key={user.id}>
              <div className="flex flex-col gap-2 items-center p-2 shadow-md rounded-md">
                <div className="w-full h-40 md:h-72 relative">
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
