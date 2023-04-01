"use client";

import { useSupabase } from "@/context/supabase-provider";
import Button from "@/components/common/Button";
import Link from "next/link";

export default function LandingPageCallToAction() {
  const { userId } = useSupabase();

  return (
    <>
      {/* {userId} */}
      <Button className="text-center text-xl" color="red" secondary>
        {true ? (
          <Link href="/web">Get Started</Link>
        ) : (
          <Link href="/auth/signup">Get Started</Link>
        )}
      </Button>
    </>
  );
}
