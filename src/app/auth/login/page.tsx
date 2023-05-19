"use client";

import Button from "@/components/common/Button";
import { GoogleIcon } from "@/app/component/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import Input from "@/components/common/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
  };

  const handleLoginWithGoogle = async () => {};

  return (
    <div className="w-[300px] mx-auto">
      <h1 className="text-2xl">Login</h1>
      <button
        className="w-full border-2 border-black border-solid rounded flex items-center justify-center gap-4 mx-auto p-1 my-3 cursor-pointer hover:bg-black/5"
        onClick={handleLoginWithGoogle}
      >
        <GoogleIcon className="h-4" />
        <span>Login With Google</span>
      </button>
      <form className="flex flex-col gap-3" onSubmit={handleLogin}>
        <fieldset>
          <label className="flex flex-col gap-1">
            <span className="font-bold">Email</span>
            <input
              placeholder="example@gmail.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label className="flex flex-col gap-1">
            <span className="font-bold">Password</span>
            <input
              placeholder="Enter your password..."
              minLength={6}
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </fieldset>
        {formError && (
          <p className="text-red-400 font-bold text-sm">{formError}</p>
        )}
        <Button disabled={isLoading} type="submit" color="green" mode="primary">
          {isLoading ? "loading..." : "Login"}
        </Button>
      </form>
      <div className="my-3 text-center">
        Don’t have an account?
        <Link href="/auth/signup" className="mx-1 underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
