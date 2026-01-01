"use client";
"use client";
import Button from "../ui/Button";

const PartnerHero =()=>{
  return (
    <section className="bg-partner pt-[280px] pb-[80px] md:pt-[330px] md:pb-[120px]">
      <div className="container">
        <div>
          <h2 className="text-white text-center w-full max-w-[250px] md:max-w-full lg:max-w-full mx-auto mb-[16px]">
            Grow your transport business with AnyRide
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#E6E6EB] tracking-[-2%] font-normal w-full max-w-[337px] mx-auto text-center md:max-w-full lg:max-w-full mb-[40px]">
            Starting with Fleet Owner&apos;s & Vehicle partners - then expanding across the DRC&apos;s transportation ecosystem.
          </p>
          <div className="flex items-center justify-center gap-[8px] flex-col md:flex-row lg:flex-row">
            <Button type="button" css="w-[256px] h-[62px]" style="danger">
              Join Our Fleet Network
            </Button>
            <Button type="button" css="w-[226px] h-[62px]" style="tertiary">
              View  Full Roadmap
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PartnerHero;
