"use client";
import BannerFleet from "@/app/components/fleet/BannnerFleet";
import EligibleFleet from "@/app/components/fleet/EligibleFleet";
import FleetApplication from "@/app/components/fleet/FleetApplication";
import FleetEarning from "@/app/components/fleet/FleetEarning";
import FleetHero from "@/app/components/fleet/FleetHero";
import FleetOwner from "@/app/components/fleet/FleetOwners";
import FleetTool from "@/app/components/fleet/FleetTool";
import FleetWhy from "@/app/components/fleet/FleetWhy";
import FleetWork from "@/app/components/fleet/FleetWork";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

const Fleet = () => {
  return (
    <>
      <Header />
      <FleetHero />
      <FleetOwner />
      <EligibleFleet />
      <FleetWhy />
      <FleetWork />
      <FleetTool />
      <FleetEarning />
      <FleetApplication />
      <BannerFleet />
      <Footer />
    </>
  );
};

export default Fleet;
