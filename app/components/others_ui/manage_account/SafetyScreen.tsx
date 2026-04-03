"use client";
import React from "react";
import {
  User,
  Key,
  Bell,
  Shield,
  Globe,
  FileText,
  ChevronRight,
  Phone,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function SafetyScreen() {
  const router = useRouter();

  const menuItems = [
    { icon: User, label: "Personal info", href: "/account/personal-info" },
    { icon: Key, label: "Login & Security", href: "/account/login" },
    { icon: Bell, label: "Notifications", href: "/account/notifications" },
    {
      icon: Shield,
      label: "Safety & Privacy",
      active: true,
      href: "/account/safety",
    },
    { icon: Globe, label: "Language", href: "/account/language" },
    { icon: FileText, label: "Terms and conditions", href: "/account/terms" },
  ];

  const safetyItems = [
    "Driver's verification",
    "Driver's verification",
    "Driver's verification",
    "Driver's verification",
    "Driver's verification",
    "Driver's verification",
  ];

  return (
    <div className="w-full container mx-auto">
      <h2 className="text-[32px] md:text-[48px] font-bold text-[#333333] leading-none mb-10">
        Safety
      </h2>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-32">
        {/* Left Sidebar Menu */}
        <div className="w-full md:w-[298px] bg-[#F5F5F7] rounded-[12px] flex flex-col overflow-hidden h-fit flex-shrink-0">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              <div
                onClick={() => router.push(item.href || "#")}
                className={`flex items-center justify-between px-[16px] py-[12px] cursor-pointer transition-colors ${item.active ? "bg-[#EAEBEF]" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-[#0B153D]">
                    <item.icon size={22} className="" strokeWidth={1.5} />
                  </div>
                  <span
                    className={`text-[18px] text-[#0B153D] ${item.active ? "font-semibold" : "font-medium"}`}
                  >
                    {item.label}
                  </span>
                </div>
                <ChevronRight size={18} className="text-[#0B153D] opacity-60" />
              </div>
              {/* Divider except for last item */}
              {index < menuItems.length - 1 && (
                <div className="w-full h-[1px] bg-gray-200 ml-16"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Right Content Area */}
        <div className="flex flex-col w-full">
          <div className="flex-1 flex flex-col w-full max-w-full mb-[8px] bg-[#F5F5F7] rounded-[12px]">
            {/* <h3 className="text-[20px] font-bold text-[#0B153D] mb-2">Safety</h3>
                    <p className="text-[#8B8EA4] text-[14px] mb-6">Here&apos;s how we get you protected</p> */}

            <div className=" rounded-[12px] overflow-hidden mb-8 shadow-[0_1px_4px_rgba(0,0,0,0.02)]">
              {safetyItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 bg-whi cursor-pointer hover:bg-gray-50 transition-colors ${
                    index < safetyItems.length - 1
                      ? "border-b border-[#E6E6EB]"
                      : ""
                  }`}
                >
                  <span className="text-[18px] font-medium text-[#02093A] leading-[140%]">
                    {item}
                  </span>
                  <ChevronRight size={16} className="text-[#8B8EA4]" />
                </div>
              ))}
            </div>
          </div>
          <div>
            {/* SOS Button */}
            <button className="w-full bg-[#EF4444] hover:bg-[#d93232] actie:scale-[0.99] transition-all text-white text-[16px] font-bold h-[50px] rounded-[12px] flex items-center justify-center gap-2 mb-4">
              <Phone size={24} fill="white" />
              Call 990
            </button>

            <button className="w-full h-[50px] bg-[#F5F5F7] text-[14px] font-bold text-[#0B153D] hover:opacity-80 transition-opacity rounded-[12px]">
              Emergency Contacts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
