"use client";
import Image from "next/image";
import PricingForm from "../home/Pricing/PricingForm";
// import PricingForm from "./PricingForm";

const HeroRider = () => {
  return (
    <section className="py-[120px] md:py-[130px] lg:py-[140px]">
      <div className="container">
        <div>
            <h1 className="text-[40px] md:text-[50px] font-bold leading-[120%] tracking-[-5%] mb-[24px] text-text-accent lg:hidden">Get where you&apos;re going faster, safer, and fair.</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-x-[30px]">
          {/* Text + Form */}
          <div className="h-full w-full order-2 md:order-1 mb-[10px]">
            <div>
              <h2 className="mt-7.5 hidden md:hidden lg:block xl:block">
                Get where you&apos;re going faster, safer, and fair.
              </h2>

              <PricingForm />
            </div>
          </div>

          {/* Image */}
          <div className="h-full w-full max-w-full md:max-w-full h-[272px] mx-auto order-1 md:order-2 ">
            <Image
              src="/icons/Rectangle.svg"
              alt="Pricing"
              width={500}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroRider;
