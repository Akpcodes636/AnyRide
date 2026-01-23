"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Banner from "@/app/components/partners/Banner";
import PartnerBanner from "@/app/components/partners/PartnerBanner";
import PartnerCatergories from "@/app/components/partners/PartnerCatergories";
import PartnerHero from "@/app/components/partners/PartnerHero";
import PartnersWork from "@/app/components/partners/PartnersWork";
import PartnerTrust from "@/app/components/partners/PartnerTrust";
import PartnerUs from "@/app/components/partners/PartnerUs";
import WhyPartners from "@/app/components/partners/WhyPartner";

const Partners = () => {
    return (
     <>
     <Header />
     <PartnerHero />
     <WhyPartners />
     <PartnerBanner />
     <PartnerCatergories />
     <PartnersWork />
     <PartnerUs />
     <PartnerTrust />
     <Banner />
     <Footer />
     </>
    )
}

export default Partners;