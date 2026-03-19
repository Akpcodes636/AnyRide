"use client";

import Header from "@/app/components/Header";
import MapLayout from "@/app/components/request-ride/MapLayout";

interface RideLayoutProps {
  children: React.ReactNode;
}

const RideLayout = ({ children }: RideLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Flow Container */}
      <main className="pt-[90px] w-full min-h-[calc(100vh-90px)]">
        <div className="flex flex-col lg:flex-row h-full">

          {/* PERSISTENT MAP - LEFT SIDE */}
          <div className="w-full lg:w-[45%] h-[400px] lg:h-[calc(100vh-90px)] lg:sticky lg:top-[90px] p-4 lg:p-8">
            <div className="w-full h-full rounded-[32px] overflow-hidden shadow-md border border-gray-100">
              <MapLayout />
            </div>
          </div>

          {/* DYNAMIC CONTENT - RIGHT SIDE */}
          <div className="w-full lg:w-[55%] min-h-[calc(100vh-90px)] overflow-y-auto">
            <div className="p-4 lg:p-12 xl:p-16">
              {children}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default RideLayout;
