"use client";
import Faq from "@/app/components/driver/Faq";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Banner from "@/app/components/partners/Banner";
import FleetOwnersSection from "@/app/components/partners/FleetOwnersSection";
import HowPartnershipWorks from "@/app/components/partners/HowPartnershipWorks";
import PartnerHero from "@/app/components/partners/PartnerHero";
import PartnerSection from "@/app/components/partners/PartnerSection";
import Roadmap from "@/app/components/partners/Roadmap";
import Stats from "@/app/components/partners/Stats";

const Partners = () => {
    return (
     <>
     <Header />
     <PartnerHero />
     <Stats />
     <PartnerSection />
     <FleetOwnersSection />
     <HowPartnershipWorks />
     <Roadmap />
     <Faq />
     <Banner />
     <Footer />
     </>
    )
}

export default Partners;