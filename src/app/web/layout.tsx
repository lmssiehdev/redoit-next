import SupabaseProvider from "@/context/supabase-provider";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SupabaseProvider>{children}</SupabaseProvider>
    </>
  );
}
