"use client";
import PartnershipForm from "../forms/PartnershipForm";

export default function PartnerUs() {
  return (
    <section className="py-[40px] md:py-[52px] lg:py-[64px] bg-[#010418]">
      <div className="container mx-auto">
        <h1 className="text-[30px] md:text-[50px] lg:text-[62px] font-bold leading-[-120%] tracking-[-5%] text-center text-[#FFFFFF]">Want to partner with us?</h1>
        <p className="text-[#E6E6EB] text-center  tracking-[-2%] leading-[160%]">Fill out the form below with the necessary info to join</p>
        <div>
            <PartnershipForm />
        </div>
      </div>
    </section>
  );
}
