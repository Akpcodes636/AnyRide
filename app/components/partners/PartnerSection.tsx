"use client";
import SubTitle from "../ui/Subtitle";
import PartnerGrid from "./PartnerGrid";

const PartnerSection = () =>{
    return (
     <section className="py-[32px] md:py-[50px] lg:py-[72px]">
        <div className="container">
            <div className="flex items-center justify-center flex-col">
            <div className="mb-[24px]">
                 <SubTitle text="Safety & Trust" css="rounded-[40px] font-normal" />
            </div>
            <h2>Who Can Partner with AnyRide</h2>
            </div>
            
            <div className="py-[132px]">
                <PartnerGrid />
            </div>
        </div>
     </section>
    )
}

export default PartnerSection;