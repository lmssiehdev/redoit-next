"use client";

import Button from "@/components/common/Button";
import { GoogleIcon } from "@/app/component/Icons";
import { useSupabase } from "@/context/supabase-provider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const { supabase } = useSupabase();
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (password.length < 6) {
      setFormError("Invalid password. Must be 6 characters or longer.");

      return;
    }

    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
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

  const handleSignUpWithGoogle = async () => {
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
      <h1 className="text-2xl">Sign Up</h1>

      <button
        className="w-full border-2 border-black border-solid rounded flex items-center justify-center gap-4 mx-auto p-1 my-3 cursor-pointer hover:bg-black/5"
        onClick={handleSignUpWithGoogle}
      >
        <GoogleIcon className="h-4" />
        <span>Sign Up With Google</span>
      </button>
      <form className="flex flex-col gap-3" onSubmit={handleSignUp}>
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
          {isLoading ? "loading..." : "Sign Up"}
        </Button>
      </form>

      <div className="my-3 text-center">
        Already signed up?
        <Link href="/auth/login" className="mx-1 underline">
          Go to login
        </Link>
      </div>
    </div>
  );
}
