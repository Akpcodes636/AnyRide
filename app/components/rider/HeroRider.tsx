// "use client";
// import { useTranslations } from "next-intl";
// import Button from "../ui/Button";

// const HeroRider = () => {
//   const t = useTranslations("HomePage.hero");

//   return (
//     <section className=" bg-cover bg-center bg-no-repeat bg-red-600"style={{ backgroundImage: "url('/en/riders.png')" }}>
//       <div className="py-[220px] md:py-[230px] lg:py-[280px]">
//       <div className="container">
//         <div>
//         <h1 className="text-[32px] md:text-[50px] lg:text-[64px] text-white font-bold text-center leading-[120%] tracking-[-5%] max-w-[673px] mx-auto mb-[16px]">Ride your way. <br /> Anytime, anywhere.</h1>
//         <p className="text-[#E6E6EB] text-[18px] leading-[160%] tracking-[-2%] text-center max-w-[673px] mx-auto mb-[32px]">Book safe, affordable rides with verified drivers using cars or motorcycles — all from one simple app.</p>
//         <div className="flex items-center justify-center">
//         <Button style="danger" type="button" css="">Book a ride</Button>
//         </div>

//         </div>
//       </div>
//       </div>
//     </section>
//   );
// };

// export default HeroRider;


"use client";

import { useTranslations, useLocale } from "next-intl";
import Button from "../ui/Button";

const HeroRider = () => {
  const t = useTranslations("RiderPage.hero");
  const locale = useLocale();

  return (
   <section className=" h-screen bg-cover bg-center bg-no-repeat bg-red-600"style={{ backgroundImage: "url('/en/riders.svg')" }}>
      <div className="flex items-center justify-center h-full container">
        <div className="pt-[148px] md:pt-[230px] lg:pt-[200px]">
          <div>
            <h1 className="text-[32px] md:text-[50px] lg:text-[64px] text-white font-bold text-center leading-[120%] tracking-[-5%] max-w-[673px] mx-auto mb-[16px]">
              {t("title")} <br />
              {t("subtitle")}
            </h1>

            <p className="text-[#E6E6EB] text-[18px] leading-[160%] tracking-[-2%] text-center max-w-[673px] mx-auto mb-[32px]">
              {t("description")}
            </p>

            <div className="flex items-center justify-center">
              <Button style="danger" type="button">
                {t("cta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRider;
