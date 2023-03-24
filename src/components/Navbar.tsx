"use client";

import { useSupabase } from "@/context/supabase-provider";
import clsx from "clsx";
import Link from "next/link";

type Props = {
  className?: string;
};

export default function Navbar({ className }: Props): JSX.Element {
  return (
    <div className={clsx("flex items-center justify-between", className)}>
      <h1 className="text-3xl py-2">
        <Link href="/">Redoit</Link>
      </h1>
      <nav className="flex items-center ">
        <ul>
          {true ? (
            <>
              <li onClick={() => handleLogout()}>Logout</li>
            </>
          ) : (
            <>
              <li onClick={() => handleSingUp()}>Sign Up</li>
              <li onClick={() => handleSingIn()}>Log in</li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
