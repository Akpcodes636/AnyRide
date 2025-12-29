// "use client";
// import Image from "next/image";
// import Button from "../ui/Button";
// import SubTitle from "../ui/Subtitle";
// import { GuideContents } from "@/app/utils/Content";

// const About = () => {
//   return (
//     <section className="">
//       <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[2fr_1fr]  xl:grid-cols-[2fr_1fr] h-full gap-16">
//         <div className="h-full w-full flex items-center justify-center md:items-start md:justify-start flex-col py-6 md:py-16.5 px-4 lg-[1024]:px-10">
//           <div className="mb-6">
//             <SubTitle text="Guides" css="rounded-[40px] font-bold" />
//           </div>
//           <h2>How Anyride works</h2>
//           <p className="text-center md:text-start text-[16px] font-normal text-gray-400 mb-10">
//             AnyRide keeps your movement simple — from daily commutes to weekend
//             hangouts. Just open the app, request a ride, and you&apos;re on your
//             way.
//           </p>

//           <div className="flex items-center justify-center gap-4">
//             <Button style="primary" css="w-[104px] h-[60px]" type="button">
//               Rider
//             </Button>
//             <Button style="danger" css="w-[104px] h-[60px]" type="button">
//               Driver
//             </Button>
//           </div>

//           <div>
//             <div className="w-full md:max-w-full lg:max-w-full xl:max-w-full  rounded-lg mt-8 md:mt-8.75 lg:mt-10 xl:mt-10">
//               <div className="">
//                 {GuideContents.map((l, i) => (
//                   <div
//                     key={i}
//                     className={`${l.color} p-6 md:p-15 rounded-lg mb-4`}
//                   >
//                     <h3 className="text-[28px] md:text-[35px] lg:text-[40px] font-semibold text-[#010418] mb-3.75 leading-[120%]">
//                       {l.title}
//                     </h3>
//                     <p className="text-[14px] md:text-[16px] text-[#333333] leading-[153%] tracking-[-2%]">
//                       {l.text}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="w-full h-full hidden md:hidden lg:block xl:block">
//           <Image
//             src="/images/About-img.png"
//             width={500}
//             height={500}
//             alt="image of a road"
//             className="w-full h-full object-cover"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default About;


"use client";
import Image from "next/image";
import { useState } from "react";
import Button from "../ui/Button";
import SubTitle from "../ui/Subtitle";
// import { GuideContents, GuideItem } from "@/app/utils/Content";

export interface GuideItem {
  title: string;
  text: string;
  color: string;
}

export const GuideContents: Record<"Rider" | "Driver", GuideItem[]> = {
  Rider: [
    {
      title: "Get Ride Requests Instantly",
      text: "Go online and AnyRide will connect you with riders nearby. Check the pickup location, estimated distance, and fare before you accept.",
      color: "bg-[#F6E6E6]"
    },
    {
      title: "Navigate Smoothly",
      text: "Follow clear directions, see the rider's details, and enjoy verified pickup info. Focus on the ride — no guesswork involved.",
      color: "bg-[#EBF3FE]"
    },
    {
      title: "Track Earnings Effortlessly",
      text: "Complete rides and watch your earnings update in real-time. Monitor daily totals, bonuses, and payment methods seamlessly.",
      color: "bg-[#E9F9EE]"
    }
  ],
  Driver: [
    {
      title: "Receive Delivery Requests",
      text: "Go online and get notifications for deliveries in your area. Review package details, delivery location, and expected earnings before starting.",
      color: "bg-[#FFF4E6]"
    },
    {
      title: "Deliver with Confidence",
      text: "Follow step-by-step navigation, see recipient info, and get real-time updates for smooth handoffs. Avoid confusion and delays.",
      color: "bg-[#E6F7FF]"
    },
    {
      title: "Manage Earnings & Performance",
      text: "Track all completed deliveries and your earnings instantly. Monitor bonuses, daily summaries, and payments — all in one dashboard.",
      color: "bg-[#E9F9F3]"
    }
  ]
};


const About = () => {
  const [activeTab, setActiveTab] = useState<"Rider" | "Driver">("Rider");

  return (
    <section className="">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-[2fr_1fr] h-full gap-16">
        {/* LEFT SIDE */}
        <div className="h-full w-full flex flex-col items-center md:items-start justify-center py-6 md:py-16.5 px-4 lg-[1024]:px-10">
          <div className="mb-6">
            <SubTitle text="Guides" css="rounded-[40px] font-bold" />
          </div>

          <h2>How Anyride works</h2>
          <p className="text-center md:text-start text-[16px] font-normal text-gray-400 mb-10">
            AnyRide keeps your movement simple — from daily commutes to weekend
            hangouts. Just open the app, request a ride, and you&apos;re on your
            way.
          </p>

          {/* TABS */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <Button
              style={activeTab === "Rider" ? "tertiary" : "nobg"}
              css="w-[104px] h-[60px]"
              type="button"
              fn={() => setActiveTab("Rider")}
            >
              Rider
            </Button>
            <Button
              style={activeTab === "Driver" ? "danger" : "nobg"}
              css="w-[104px] h-[60px]"
              type="button"
              fn={() => setActiveTab("Driver")}
            >
              Driver
            </Button>
          </div>

          {/* GUIDE CONTENT */}
          <div className="w-full rounded-lg">
            {(GuideContents[activeTab] as GuideItem[]).map((l, i) => (
              <div
                key={i}
                className={`${l.color} p-6 md:p-15 rounded-lg mb-4`}
              >
                <h3 className="text-[28px] md:text-[35px] lg:text-[40px] font-semibold text-[#010418] mb-3.75 leading-[120%]">
                  {l.title}
                </h3>
                <p className="text-[14px] md:text-[16px] text-[#333333] leading-[153%] tracking-[-2%]">
                  {l.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-full h-full hidden md:hidden lg:hidden xl:block">
          <Image
            src="/images/About-img.png"
            width={500}
            height={500}
            alt="image of a road"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
