"use client";
import BenefitDriver from "@/app/components/driver/BenefitDrivers";
import DiverGrid from "@/app/components/driver/DriverGrid";
import Faq from "@/app/components/driver/Faq";
import HeroSection from "@/app/components/driver/HeroSection";
import Tracking from "@/app/components/driver/Tracking";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import AnyRide from "@/app/components/home/AnyRide";


const Page = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <BenefitDriver />
      <DiverGrid />
      <Tracking />
      <Faq />
      <AnyRide />
      <Footer />
    </>
  );
};

export default Page;
