import cc from "classcat";
import { ChevronLeft, Settings } from "tabler-icons-react";

export type IconType = "ChevronLeft" | "Settings";

type IconProps = {
  type: IconType;
  color?: "white";
  size?: "small" | "medium" | "large";
  addClassNames?: string;
};

export function Icon(props: IconProps) {
  const iconColor = cc([
    {
      "stroke-white": props.color === "white",
    },
  ]);
  const iconSize = cc([
    {
      "w-3.5 h-3.5": props.size === "small",
      "w-6 h-6": props.size === "medium" || !props.size,
      "w-8 h-8": props.size === "large",
    },
  ]);

  const iconElm = (type: IconType) => {
    switch (type) {
      case "ChevronLeft":
        return <ChevronLeft className={cc([iconColor, iconSize])} />;
      case "Settings":
        return <Settings className={cc([iconColor, iconSize])} />;
    }
  };

  return <i className={cc(["inline-block", props.addClassNames])}>{iconElm(props.type)}</i>;
}
