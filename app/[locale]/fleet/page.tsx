"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Link from "next/link";
// import Header from "@/app/components/layout/Header";
// import Footer from "@/app/components/layout/Footer";

const FleetOwnersPage = () => {
  const t = useTranslations("FleetOwnersPage");
  const router = useRouter();

  const gotoWaitlist = () => router.push("/waitlist");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="bg-[#0A1F44] text-white h-screen">
        <div className="container mx-auto py-[250px] px-4 text-center flex items-center justify-center flex-col">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">{t("hero.title")}</h2>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8">{t("hero.subtitle")}</p>
          <Link href="/waitlist">
          <Button type="button" style="danger" css="w-[256px] h-[62px]" fn={gotoWaitlist}>
            {t("hero.cta")}
          </Button>

          </Link>
        </div>
      </section>

      {/* Who Fleet Owners Are */}
      <section className="container mx-auto py-20 px-4 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-3xl font-semibold mb-4">{t("who.title")}</h2>
          <p className="text-lg">{t("who.description")}</p>
        </div>
        <div className="relative w-full h-64 md:h-96">
          <Image
            src="/images/About-girl.png"
            alt="Fleet Owners"
            fill
            className="object-cover object-top rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Why Use AnyRide */}
      <section className="bg-[#081F44] py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12 text-white">{t("why.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#16366F] p-6 rounded-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-2 text-white">{t("why.manage.title")}</h3>
              <p className="text-white">{t("why.manage.description")}</p>
            </div>
            <div className="bg-[#16366F] p-6 rounded-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-2 text-white">{t("why.earnings.title")}</h3>
              <p className="text-white">{t("why.earnings.description")}</p>
            </div>
            <div className="bg-[#16366F] p-6 rounded-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-semibold mb-2 text-white">{t("why.growth.title")}</h3>
              <p className="text-white">{t("why.growth.description")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto py-20 px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">{t("how.title")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="bg-[#16366F] p-6 rounded-lg hover:shadow-lg transition-shadow">
              <h4 className="text-xl font-semibold mb-2 text-white">{t(`how.step${step}.title`)}</h4>
              <p className="text-white">{t(`how.step${step}.description`)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action */}
      <section className="bg-[#081F44] py-20 px-4 text-center">
        <h2 className="text-3xl font-semibold mb-6 text-white">{t("cta.title")}</h2>
        <p className="text-lg mb-8 text-white">{t("cta.subtitle")}</p>
        <div className="flex items-center justify-center">
            <Link href="/waitlist">
        <Button type="button" style="danger" css="w-[256px] h-[62px]" fn={gotoWaitlist}>
          {t("cta.button")}
        </Button>
            
            </Link>

        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default FleetOwnersPage;
