"use client";
import PartnerAccordion from "./PartnerAccordion";

export default function PartnerCatergories(){
    return (
        <section className="py-[40px] md:py-[50px] lg:py-[64px]">
            <div className="container mx-auto">
                <div>
                    <h3 className="font-bold text-[30px] md:text-[40px] lg:text-[48pxpx] text-center">Our Partner Categories</h3>
                    <p className="text-[#545454] font-normal tracking-[-2%] leading-[160%] text-center w-full max-w-[676px] mx-auto">Organizations we collaborate with to strengthen transportation infrastructure and operations</p>
                </div>
                <div>
                    <PartnerAccordion />
                </div>
            </div>
        </section>
    )
}