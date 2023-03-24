import SupabaseProvider from "@/context/supabase-provider";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const supabase = createClient();
  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();
  // const { data } = await supabase.from("habits").select().eq("id", user);

  const data = {};
  return (
    <div>
      <SupabaseProvider>{children}</SupabaseProvider>
    </div>
  );
}
