"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CareersHero from "@/app/components/careers/CareersHero";
import OurMission from "@/app/components/careers/OurMission";
import WhoCanApply from "@/app/components/careers/WhoCanApply";
import CareersFaq from "@/app/components/careers/CareersFaq";
import CareersValue from "@/app/components/careers/CareersValue";
import CareersPartner from "@/app/components/careers/CareersPartner";
import CareersContact from "@/app/components/careers/CareersContact";
import CareerBanner from "@/app/components/careers/CareerBanner";
// import CareerForm from "@/app/components/careers/CareersPage";

export default function CareersPage() {
    return (
        <>
            <Header />
            <CareersHero />
            <OurMission />
            <WhoCanApply />
            <CareersFaq />
            <CareersValue />
            <CareersPartner />
            <CareersContact />
            <CareerBanner />
            <Footer />
        </>
    );
}
