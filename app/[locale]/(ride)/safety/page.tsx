"use client";
import Header from "@/app/components/Header";
import { ChevronRight, Phone } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const safetyItems = [
  "Driver's verification",
  "Driver's verification",
  "Driver's verification",
  "Driver's verification",
  "Driver's verification",
  "Driver's verification",
];

export default function Page() {
   const router = useRouter();

  return (
    <>
      <Header />
      <div className="container mx-auto pt-32">
        <div className="grid grid-cols-1 md:grid-cols-2 h-full">
          <div className="">
            <div className="mb-[48px]">
              <h2>Safety</h2>
              <p className="text-[#333333] text-[18px] font-normal leading-[120%] tracking-[-4%]">
                Here&apos;s how we get you protected
              </p>
            </div>

            {/* list */}
            <div className="bg-[#F5F5F7] rounded-[8px] overflow-hidden mb-4">
              {safetyItems.map((item, index) => (
                <button
                onClick={()=>router.push("/safety/driver")}
                  key={index}
                  className={`w-full bg-white flex items-center justify-between px-4 py-4 text-[18px] text-[#02093A] font-normal leading-[140%] font-normal cursor-pointer transition-colors ${
                    index < safetyItems.length - 1
                      ? "border-b border-[#E6E6EB]"
                      : ""
                  }`}
                >
                  <span>{item}</span>
                  <ChevronRight className="w-4 h-4 text-[#8B8EA4]" />
                </button>
              ))}
            </div>

            <div>
              {/* Call 990 */}
              <button className="w-full cursor-pointer bg-[#EF3B3B] hover:bg-[#d93232] active:scale-[0.99] transition-all text-white text-[16px] font-normal py-3.5 rounded-[12px] flex items-center justify-center gap-2 mb-3">
                <Phone className="w-4 h-4" />
                Call 990
              </button>

              {/* Emergency Contacts */}
              <button className="w-full bg-[#F5F5F7] cursor-pointer text-[16px] rounded-[12px] font-normal text-[#02093A] hover:text-[#0a1660] transition-colors py-3.5">
                Emergency Contacts
              </button>
            </div>
          </div>
          <div className=" flex items-center justify-center">
            <div className="w-[360px] h-[587px]">
              <Image
                src="/images/iphone.png"
                width={500}
                height={500}
                alt="iphone pictures"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
