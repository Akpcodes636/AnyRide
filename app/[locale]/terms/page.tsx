"use client";

import { useTranslations } from "next-intl";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function TermsAndConditions() {
  const t = useTranslations("TermsAndConditions");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-gray-700">
          <p>{t("lastUpdated")}</p>
          
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">{t("section1.title")}</h2>
            <p>{t("section1.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">{t("section2.title")}</h2>
            <p>{t("section2.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">{t("section3.title")}</h2>
            <p>{t("section3.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">{t("section4.title")}</h2>
            <p>{t("section4.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">{t("section5.title")}</h2>
            <p>{t("section5.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">{t("section6.title")}</h2>
            <p>{t("section6.content")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-4">{t("section7.title")}</h2>
            <p>{t("section7.content")}</p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
