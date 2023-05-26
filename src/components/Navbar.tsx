"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  className?: string;
};

export default function Navbar({ className }: Props): JSX.Element {
  const pahtName = usePathname();

  return (
    <nav className={clsx("flex items-center justify-between ", className)}>
      <h1 className="text-3xl py-2">
        <Link href="/">
          Redoit
          <span className="text-sm text-gray-600 tracking-wide"> [alpha]</span>
        </Link>
      </h1>
      {pahtName == "/" ? (
        <Link href="/web" className="underline underline-offset-2 ">
          Go to app ↗︎
        </Link>
      ) : (
        <ul className="flex gap-4 items-center">
          <li>
            <Link
              href="/web"
              className={clsx({
                "underline underline-offset-2": pahtName === "/web",
              })}
            >
              Board
            </Link>
          </li>
          <li>
            <Link
              href="/archive"
              className={clsx({
                "underline underline-offset-2": pahtName === "/archive",
              })}
            >
              Archive
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
