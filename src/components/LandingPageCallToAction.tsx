"use client";

import Button from "@/components/common/Button";
import Link from "next/link";

export default function LandingPageCallToAction() {
  return (
    <>
      <Button className="text-center text-xl" color="red" mode="primary">
        {true ? (
          <Link href="/web">Get Started</Link>
        ) : (
          <Link href="/auth/signup">Get Started</Link>
        )}
      </Button>
    </>
  );
}
