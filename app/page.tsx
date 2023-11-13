import Image from "next/image";
import Link from "next/link";

import { User } from "@prisma/client";

import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, { cache: "no-store" });
  const users: User[] = await res.json();

  return (
    <div>
      <Header title="利用者選択画面" />
      <Container>
        <div className="grid grid-cols-3 gap-4">
          {users.map((user) => (
            <Link href={`/user/${user.id}`} key={user.id}>
              <div className="flex flex-col gap-2 items-center p-4 shadow-md rounded-md">
                <div className="w-full h-60 relative">
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
