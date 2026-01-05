"use client";
import Faq from "@/app/components/driver/Faq";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import AnyRide from "@/app/components/home/AnyRide";
import Benefits from "@/app/components/rider/Benefits";
import HeroRider from "@/app/components/rider/HeroRider";
import PricingClient from "@/app/components/rider/PricingClarity";
import PricingRider from "@/app/components/rider/PricingRider";
import RiderGrid from "@/app/components/rider/RiderGrid";


const Rider = () => {
  return (
    <>
      <Header />
      <HeroRider />
      <RiderGrid />
      <PricingRider />
      <PricingClient />
      <Benefits />
      <Faq />
      <AnyRide />
      <Footer />
    </>
  );
};

export default Rider;
