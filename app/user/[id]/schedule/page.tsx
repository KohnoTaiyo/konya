import { prisma } from "@/lib/prisma";

import { Container } from "@/components/Container/Container";
import { Header } from "@/components/Header/Header";

export default async function Schedule({ params }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });
  const schedule = [
    {
      time: "10:00の画像",
      event: ["朝食の画像", "手を洗うの画像"],
    },
    {
      time: "11:00の画像",
      event: ["おやつの画像", "手を洗うの画像", "おやつの画像", "おやつの画像", "手を洗うの画像", "おやつの画像"],
    },
    {
      event: ["昼食の画像", "手を洗うの画像"],
    },
    {
      time: "15:00の画像",
      event: ["昼食の画像"],
    },
    {
      time: "15:20の画像",
      event: [
        "昼食の画像",
        "手を洗うの画像",
        "昼食の画像",
        "手を洗うの画像",
        "昼食の画像",
        "手を洗うの画像",
        "昼食の画像",
        "手を洗うの画像",
        "昼食の画像",
        "手を洗うの画像",
        "昼食の画像",
        "手を洗うの画像",
        "昼食の画像",
        "手を洗うの画像",
        "昼食の画像",
        "手を洗うの画像",
        "昼食の画像",
        "手を洗うの画像",
      ],
    },
    {
      time: "19:00の画像",
      event: ["昼食の画像", "手を洗うの画像"],
    },
  ];

  return user ? (
    <div>
      <Header title={`${user?.name}さんのページ\nスケジュール`} backHref={`/user/${params.id}`} />
      <Container>
        {schedule.length ? (
          <div className="space-y-2">
            {schedule.map((s) => (
              <div className="flex border-b border-primary pb-2 last-of-type:border-b-0" key={s.time}>
                <div className="w-32">{s.time}</div>
                <div className="flex flex-1 gap-x-4 gap-y-2 flex-wrap">
                  {s.event.map((e) => (
                    <div key={e}>{e}</div>
                  ))}
                </div>
              </div>
            ))}
            <p className="rounded-md text-center p-4 bg-primary">おしまい</p>
          </div>
        ) : (
          <p>スケジュールが登録されていません</p>
        )}
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
