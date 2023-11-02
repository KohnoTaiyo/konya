import Link from "next/link";

type ButtonProps = {
  text: string;
  href?: string;
};

export function Button(props: ButtonProps) {
  return props.href ? (
    <Link href={{ pathname: props.href }} className="w-full">
      <button className="bg-secondary rounded-md text-large text-white w-full h-28 font-bold shadow-md">
        {props.text}
      </button>
    </Link>
  ) : (
    <button className="bg-secondary rounded-md text-large text-white w-full h-28 font-bold shadow-md w-full">
      {props.text}
    </button>
  );
}
