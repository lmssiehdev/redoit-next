import "./globals.css";

import localFont from "next/font/local";

const indieFlower = localFont({
  src: "../../public/fonts/IndieFlower-Regular.ttf",
  variable: "--font-indie-flower",
  display: "swap",
});

const andalusia = localFont({
  src: "../../public/fonts/Andalusia.otf",
  variable: "--font-andalusia",
  display: "swap",
});

import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

const APP_NAME = "Redoit";
const APP_DEFAULT_TITLE = "Redoit Habit Tracker";
const APP_TITLE_TEMPLATE = "%s - PWA App";
const APP_DESCRIPTION = "Best Habit Tracker in the world!";

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
  const data = {};
  return (
    <html lang="en" className={`${indieFlower.variable} ${andalusia.variable}`}>
      <body className="flex flex-col min-h-[100vh] max-w-screen-md mx-auto  px-2 font-indieFlower bg-[#faf0e4]">
        <Navbar className="mb-4" />
        <div className="mx-auto flex-1">
          <main className="flex-1 flex-wrap mx-auto">{children}</main>
        </div>

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
