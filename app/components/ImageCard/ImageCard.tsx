import Image from "next/image";

import cc from "classcat";

import { Icon } from "@/components/Icon/Icon";

export function ImageCard({ name, image, isAddType }: { name: string; image?: string; isAddType?: boolean }) {
  const imageCardClass = cc([
    "p-2 shadow-md rounded-md w-28",
    {
      "bg-lightGray": isAddType,
    },
  ]);
  return (
    <div className={imageCardClass}>
      <div className="w-full h-20 relative mb-2 flex items-center justify-center">
        {isAddType ? (
          <Icon type="Plus" size="large" />
        ) : (
          image && <Image src={image} alt="" fill style={{ objectFit: "cover" }} sizes="100%" />
        )}
        {/* <Image src={image} alt="" fill style={{ objectFit: "cover" }} sizes="100%" /> */}
      </div>
      <p className="text-center">{name}</p>
    </div>
  );
}
