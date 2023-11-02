import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default function Home() {
  const users = [
    { name: "ユーザー01", image: "/images/human01.png", id: "1" },
    { name: "ユーザー02", image: "/images/human02.png", id: "2" },
    { name: "ユーザー03", image: "/images/human01.png", id: "3" },
    { name: "ユーザー04", image: "/images/human02.png", id: "4" },
    { name: "ユーザー05", image: "/images/human01.png", id: "5" },
    { name: "ユーザー06", image: "/images/human02.png", id: "6" },
  ];

  return (
    <div>
      <Header title="利用者選択画面" />
      <Container>
        <div className="grid grid-cols-3 gap-4">
          {users.map((user) => (
            <Link href={`/user/${user.id}`} key={user.id}>
              <div className="flex flex-col gap-2 items-center p-4 shadow-md rounded-md">
                <div className="w-full h-60 relative">
                  <Image src={user.image} alt={`${user.image}の画像`} layout="fill" objectFit="cover" />
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
