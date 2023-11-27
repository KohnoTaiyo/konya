import cc from "classcat";
import { ChevronLeft, Circle, Home, Plus, Settings, User, X } from "tabler-icons-react";

export type IconType = "ChevronLeft" | "Circle" | "Home" | "Plus" | "Settings" | "User" | "X";

type IconProps = {
  type: IconType;
  color?: "white";
  size?: "small" | "medium" | "large" | "full";
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
      "w-full h-full": props.size === "full",
    },
  ]);

  const iconElm = (type: IconType) => {
    switch (type) {
      case "ChevronLeft":
        return <ChevronLeft className={cc([iconColor, iconSize])} />;
      case "Circle":
        return <Circle className={cc([iconColor, iconSize])} />;
      case "Home":
        return <Home className={cc([iconColor, iconSize])} />;
      case "Plus":
        return <Plus className={cc([iconColor, iconSize])} />;
      case "Settings":
        return <Settings className={cc([iconColor, iconSize])} />;
      case "User":
        return <User className={cc([iconColor, iconSize])} />;
      case "X":
        return <X className={cc([iconColor, iconSize])} />;
    }
  };

  return <i className={cc(["inline-block", props.addClassNames])}>{iconElm(props.type)}</i>;
}
