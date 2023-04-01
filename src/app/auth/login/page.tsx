"use client";

import Button from "@/components/common/Button";
import { GoogleIcon } from "@/app/component/Icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEventHandler, useState } from "react";
import { useSupabase } from "../../../context/supabase-provider";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (password.length < 6) {
      setFormError("Invalid password. Must be 6 characters or longer.");

      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.log("error", error.message);
        setFormError(error.message);
        return;
      }

      router.push("/");
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginWithGoogle = async () => {
    console.log(" I have been called");
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "/welcome",
        },
      });

      if (error) {
        console.log("error", error.message);
        setFormError(error.message);
        return;
      }
    } catch (error) {}
  };

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
              className="border-[1.5px] border-solid rounded-[0_0_125px_3px/3px_85px_5px_55px] py-1 px-2"
              placeholder="example@gmail.com"
              type="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
          </label>
        </fieldset>
        <fieldset>
          <label className="flex flex-col gap-1">
            <span className="font-bold">Password</span>
            <input
              className="border-[1.5px] border-solid rounded-[0_0_125px_3px/3px_85px_5px_55px] py-1 px-2"
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
        <Button disabled={isLoading} type="submit" color="green" primary>
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
