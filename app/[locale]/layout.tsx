import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Sora } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../styles/globals.css";
import { routing } from "@/i18n/routing";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnyRide",
  description: "Local ride-hailing app",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>; // ✅ params is a Promise in Next.js 15
}) {
  const { locale } = await params; // ✅ Await params before destructuring

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Dynamically load messages for the locale
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (e) {
    console.error("Locale file not found:", locale);
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={`${sora.variable} antialiased`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}