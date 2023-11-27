import Image from "next/image";

import cc from "classcat";

import { Icon } from "@/components/Icon/Icon";

type ImageCardProps = {
  name: string;
  image?: string;
  isAddType?: boolean;
  isSelected?: boolean;
  addClassNames?: string;
  onDelete?: () => void;
  onComplete?: () => void;
  isTranslucent?: boolean;
};

export function ImageCard(props: ImageCardProps) {
  const imageCardClass = cc([
    "p-2 shadow-md rounded-md relative cursor-pointer",
    {
      "bg-secondary text-white": props.isAddType,
      "shadow-inner bg-gray": props.isSelected,
      "opacity-30": props.isTranslucent,
    },
    props.addClassNames,
  ]);

  const iconClass = cc([
    "absolute w-6 h-6 rounded-full bg-gray shadow-md text-white flex items-center justify-center -right-2 -top-2",
    {
      "bg-gray": props.onDelete,
      "bg-secondary": props.onComplete,
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
      {(props.onDelete || props.onComplete) && (
        <span className={iconClass} onClick={props.onDelete || props.onComplete}>
          {props.onDelete ? <Icon type="X" size="small" /> : <Icon type="Circle" size="small" />}
        </span>
      )}
    </div>
  );
}
