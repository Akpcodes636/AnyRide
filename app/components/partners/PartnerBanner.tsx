"use client";

export default function PartnerBanner() {
  return (
    <section className="bg-partners h-screen">
      <div className="container mx-auto h-full flex items-center justify-center flex-col">
        <div className="flex items-center justify-center flex-col">
          <h1 className="text-[32px] md:text-[62px] text-white font-bold tracking-[-5%] leading-[120%] text-center mb-[16px]">Who We Partner With</h1>
          <p className="w-full max-w-[620px] mx-auto text-[#E6E6EB] text-center text-[16px] md:text-[18px]">
            AnyRide collaborates with organizations that support transportation
            infrastructure, safety, compliance, operations, and growth.
          </p>
        </div>
      </div>
    </section>
  );
}
