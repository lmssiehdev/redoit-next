"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase-browser";

import type { SupabaseClient, User } from "@supabase/auth-helpers-nextjs";
// import type { Database } from "@/lib/database.types";

type SupabaseContext = {
  supabase: SupabaseClient;
  userId: User | null;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createClient());
  const [userId, setUserId] = useState<User | null>(null);

  async function ee() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUserId(user);
  }

  ee();

  return (
    <Context.Provider value={{ supabase, userId }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider");
  } else {
    return context;
  }
};
