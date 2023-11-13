import Link from "next/link";

import cc from "classcat";

type ButtonProps = {
  text: string;
  href?: string;
  size?: "small" | "card";
  addClassNames?: string;
  type?: "submit";
  disabled?: boolean;
};

export function Button(props: ButtonProps) {
  const buttonClass = cc([
    "bg-secondary rounded-md text-white shadow-md cursor-pointer",
    {
      "w-full h-28 font-bold text-large": props.size === "card" || !props.size,
      "py-2 px-4": props.size === "small",
      "bg-gray opacity-50": props.disabled,
    },
    props.addClassNames,
  ]);

  const CustomElement = props.type ? "input" : "button";

  return props.href ? (
    <Link href={{ pathname: props.href }} className="w-full">
      <button className={buttonClass} disabled={props.disabled}>
        {props.text}
      </button>
    </Link>
  ) : (
    <CustomElement className={buttonClass} type={props.type || "button"} value={props.text} disabled={props.disabled} />
  );
}
