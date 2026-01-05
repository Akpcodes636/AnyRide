"use client";
import { pricingClarity } from "@/app/utils/Content";
import Image from "next/image";

const PricingClient = () => {
  return (
    <section className="py-[32px] md:py-[50px] lg:py-[80px]">
      <div className="container">
        <div>
          <h2 className="text-center">Pricing Clarity</h2>
          <p className="text-center text-[#545454] text-[16px] md:text-[18px] font-normal leading-[160%] tracking-[-2%]">
            Simple breakdown for trust (example values).
          </p>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 pt-[80px]">
            {pricingClarity.map((i, l) => (
              <div
                key={l}
                className="bg-[#F9EEEE] w-full max-w-full md:max-w-full lg:max-w-[405px] h-[150px] rounded-[6px]"
              >
                <div className="p-4">
                  <div className="flex items-center gap-[16px] mb-[16px]">
                    <div className="w-[40px] h-[40px]">
                      <Image
                        src={i.img}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                        alt="icon"
                      />
                    </div>

                    <div>
                      <h3 className="text-[#02093A] text-[24px] leading-[160%] tracking-[-2%] font-bold">
                        {i.title}
                      </h3>
                      <p className="text-[#555A7B] text-[16px] leading-[160%] tracking-[-2%]">
                        {i.text}
                      </p>
                    </div>
                  </div>

                  <p className="text-[#02093A] text-[32px] leading-[120%] font-bold">
                    {i.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingClient;
