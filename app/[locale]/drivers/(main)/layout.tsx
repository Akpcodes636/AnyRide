"use client";

import Header from "@/app/components/Header";
import MapLayout from "@/app/components/request-ride/MapLayout";
import { usePathname } from "next/navigation";


interface RideLayoutProps {
  children: React.ReactNode;
}

const RideLayout = ({ children }: RideLayoutProps) => {
  const pathname = usePathname();
  
  // Exclude my-vehicles, Review, and wallet from ride layout
  const shouldApplyRideLayout = !pathname?.includes("/my-vehicles") && 
                                 !pathname?.includes("/Review") && 
                                 !pathname?.includes("/wallet");

  if (!shouldApplyRideLayout) {
    return <>{children}</>;
  }

  return (
    <>
    <Header />
    <section className="min-h-screen pt-20 lg:pt-28">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-[19px] items-stretch justify-end">
          
          {/* Map Side */}
          <div className="w-full lg:w-1/2 h-full">
            <MapLayout />
          </div>

          {/* Dynamic Card Side */}
          <div className="w-full lg:w-1/2 h-full">
            {children}
          </div>

        </div>
      </div>
    </section>
    </>
  );
};

export default RideLayout;
