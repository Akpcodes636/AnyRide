"use client";
import Faq from "@/app/components/driver/Faq";
import HeroSection from "@/app/components/driver/HeroSection";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import AnyRide from "@/app/components/home/AnyRide";

const Page = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <Faq />
      <AnyRide />
      <Footer />
    </>
  );
};

export default Page;
