import Image from "next/image";

import cc from "classcat";

import { Icon } from "@/components/Icon/Icon";

type ImageCardProps = {
  name: string;
  image?: string;
  isAddType?: boolean;
  isSelected?: boolean;
};

export function ImageCard(props: ImageCardProps) {
  const imageCardClass = cc([
    "p-2 shadow-md rounded-md w-full",
    {
      "bg-lightGray": props.isAddType,
      "border-2 border-red": props.isSelected,
    },
  ]);
  return (
    <div className={imageCardClass}>
      <div className="w-full h-20 relative mb-2 flex items-center justify-center">
        {props.isAddType ? (
          <Icon type="Plus" size="large" />
        ) : (
          props.image && (
            <Image src={props.image} alt={`${props.name}の画像`} fill style={{ objectFit: "cover" }} sizes="100%" />
          )
        )}
      </div>
      <p className="text-center">{props.name}</p>
    </div>
  );
}
