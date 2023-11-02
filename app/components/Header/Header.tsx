import Link from "next/link";

import { Icon } from "@/components/Icon/Icon";

export function Header({ title, backHref }: { title: string; backHref?: string }) {
  return (
    <header className="p-4 bg-primary text-white text-center flex justify-between items-center">
      <span className="w-8 h-8">
        {backHref && (
          <Link href={{ pathname: backHref }}>
            <Icon type="ChevronLeft" size="large" />
          </Link>
        )}
      </span>
      <h1 className="text-2xl font-bold text-xLarge flex-1">{title}</h1>
      <span className="w-8 h-8">
        <Link href="/admin">
          <Icon type="Settings" size="large" />
        </Link>
      </span>
    </header>
  );
}
