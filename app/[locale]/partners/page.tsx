"use client";
import Faq from "@/app/components/driver/Faq";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Banner from "@/app/components/partners/Banner";
import FleetOwnersSection from "@/app/components/partners/FleetOwnersSection";
import HowPartnershipWorks from "@/app/components/partners/HowPartnershipWorks";
import PartnerBanner from "@/app/components/partners/PartnerBanner";
import PartnerCatergories from "@/app/components/partners/PartnerCatergories";
import PartnerForm from "@/app/components/partners/PartnerForm";
import PartnerHero from "@/app/components/partners/PartnerHero";
import PartnerSection from "@/app/components/partners/PartnerSection";
import Roadmap from "@/app/components/partners/Roadmap";
import WhyPartners from "@/app/components/partners/WhyPartner";

const Partners = () => {
    return (
     <>
     <Header />
     <PartnerHero />
     <WhyPartners />
     <PartnerBanner />
     <PartnerCatergories />
     {/* <PartnerSection /> */}
     {/* <FleetOwnersSection /> */}
     {/* <HowPartnershipWorks /> */}
     {/* <PartnerForm /> */}
     {/* <Roadmap /> */}
     {/* <Faq /> */}
     {/* <Banner /> */}
     {/* <Footer /> */}
     </>
    )
}

export default Partners;