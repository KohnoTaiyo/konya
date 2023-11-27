import Link from "next/link";

import cc from "classcat";

type ButtonProps = {
  text: string;
  href?: string;
  size?: "small" | "card";
  color?: "secondary" | "gray";
  addClassNames?: string;
  type?: "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export function Button(props: ButtonProps) {
  const buttonClass = cc([
    "rounded-md text-white shadow-md cursor-pointer",
    {
      "w-full h-28 font-bold text-large": props.size === "card" || !props.size,
      "py-2 px-4": props.size === "small",
      "bg-gray opacity-50": props.disabled,
      "bg-secondary": !props.color,
      "bg-gray": props.color === "gray",
    },
    props.addClassNames,
  ]);

  return props.href ? (
    <Link href={{ pathname: props.href }} className="w-full">
      <button className={buttonClass} disabled={props.disabled}>
        {props.text}
      </button>
    </Link>
  ) : props.type ? (
    <input className={buttonClass} type={props.type} value={props.text} disabled={props.disabled} />
  ) : (
    <button className={buttonClass} disabled={props.disabled} onClick={props.onClick}>
      {props.text}
    </button>
  );
}
