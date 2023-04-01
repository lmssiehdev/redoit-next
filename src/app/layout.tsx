import SupabaseProvider from "../context/supabase-provider";
import "./globals.css";

import { Indie_Flower } from "next/font/google";
import localFont from "next/font/local";

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const andalusia = localFont({
  src: "../../public/Andalusia.otf",
  variable: "--font-andalusia",
  display: "swap",
});

import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

const APP_NAME = "PWA App";
const APP_DEFAULT_TITLE = "My Awesome PWA App";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best PWA app in the world!";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  themeColor: "#FFFFFF",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_DEFAULT_TITLE,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    shortcut: "/favicon.ico",
    apple: [
      { url: "/icons/touch-icon-ipad.png", sizes: "152x152" },
      { url: "/icons/touch-icon-ipad-retina.png", sizes: "167x167" },
      { url: "/icons/touch-icon-iphone-retina.png", sizes: "180x180" },
    ],
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: "/icons/og.png",
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    images: "/icons/twitter.png",
  },
};

export default async function RootLayout({
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
    <html lang="en" className={`${indieFlower.variable} ${andalusia.variable}`}>
      <body className="flex flex-col min-h-[100vh] px-2 font-indieFlower bg-[#faf0e4]">
        <SupabaseProvider>
          <Navbar className="lg:w-[500px] lg:mx-auto mb-4" />
          <div className="max-w-[1000px] mx-auto flex-1">
            <main className="flex-1 flex-wrap mx-auto">{children}</main>
          </div>
        </SupabaseProvider>

        <Footer />
      </body>
    </html>
  );
}

const Footer = () => {
  return (
    <footer className="mx-auto py-2">
      <a
        className="underline underline-offset-2 "
        href="https://tally.so/r/wvMWaA"
        target="_blank"
      >
        send feedback please ↗︎
      </a>
    </footer>
  );
};
