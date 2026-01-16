import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Sora } from "next/font/google";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import "../styles/globals.css";
import { routing } from "@/i18n/routing";
import { Toaster } from "sonner"; // ✅ Import Sonner
import Script from "next/script";


const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnyRide",
  description: "Local ride-hailing app",
  icons: {
    icon: "/favicon.ic",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

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
          <Toaster /> {/* ✅ Add it here for global notifications */}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
