"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CareersHero from "@/app/components/careers/CareersHero";
import OurMission from "@/app/components/careers/OurMission";
import WhoCanApply from "@/app/components/careers/WhoCanApply";

export default function CareersPage() {
    return (
        <>
            <Header />
            <CareersHero />
            <OurMission />
            <WhoCanApply />
            <Footer />
        </>
    );
}
