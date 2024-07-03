import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Locale, i18n } from "@/i18n-config";
import { Navbar } from "./components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js - Internationalization",
  description: "Next.js example with internationalization support",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { lang: Locale };
}>) {
  return (
    <html lang={params.lang}>
      <body className={`${inter.className}`}>
        <Navbar lang={params.lang} />
        {children}
      </body>
    </html>
  );
}
