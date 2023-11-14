import Image from "next/image";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";
import { Icon } from "@/components/Icon/Icon";

export default async function Admin() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <Header title="管理画面" backHref="/" isHomeIcon />
      <Container>
        <div className="grid grid-cols-3 gap-4">
          <Link href="/admin/user">
            <div className="flex flex-col gap-2 items-center p-4 shadow-md rounded-md bg-lightGray">
              <div className="w-full h-60 relative flex items-center justify-center">
                <Icon type="Plus" size="large" />
              </div>
              <p className="font-bold text-large">ユーザーの追加</p>
            </div>
          </Link>
          {users.map((user) => (
            <Link href={`/admin/${user.id}`} key={user.id}>
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
