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
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsConditionsScreen() {
  const router = useRouter();
  const menuItems = [
    { icon: User, label: "Personal info", href: "/account/personal-info" },
    { icon: Key, label: "Login & Security", href: "/account/login" },
    { icon: Bell, label: "Notifications", href: "/account/notifications" },
    { icon: Shield, label: "Safety & Privacy", href: "/account/safety" },
    { icon: Globe, label: "Language", href: "/account/language" },
    {
      icon: FileText,
      label: "Terms and conditions",
      active: true,
      href: "/account/terms",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
      <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-10">
        Terms & Conditions
      </h2>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
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
        <div className="flex-1 flex flex-col max-w-[700px]">
          <h3 className="text-[24px] leading-[160%] font-light text-[#333333] mb-1">
            AnyRide terms & policy
          </h3>
          <div className="flex items-center gap-2 text-[18px] font-medium mb-1">
            <span className="text-[#A20602]">v.1.1.0</span>
            <span className="text-[#666666]">Last updated:</span>
            <span className="text-[#02093A] font-bold">August 8, 2025</span>
          </div>

          <a
            href="#"
            className="text-[#A20602] text-[18px] font-semibold underline hover:text-red-800 transition-colors mb-4 block"
          >
            Download as PDF
          </a>

          {/* Scrollable Terms Content */}
          <div className="relative pr-6 mt-2 mb-6 h-[260px] overflow-y-auto custom-scrollbar">
            <div className="text-[18px] leading-[170%] text-[#666666] flex flex-col gap-4">
              <p>
                Welcome to <strong className="text-[#353A61]">AnyRide!</strong>
                <br />
                Before you get started, here&apos;s the boring but important
                stuff, You are responsible for maintaining the confidentiality
                of your account details and for all activities that occur under
                your account. Content Any content you submit remains yours, but
                you grant us a license to use as necessary for app
                functionality. You are responsible for maintaining the
                confidentiality of your account details and for all activities
                that occur under your account. Content Any content you submit
                remains yours, but you grant us a license to use, display, and
                share it as necessary for app functionality. Limitations of
                Liability We are not liable for any loss, damage, or
                inconvenience caused by the use or inability to use the app.
              </p>
              <p>
                By continuing to use the AnyRide application or related
                services, you automatically agree to these terms. If you
                disagree, you must stop using the app immediately.
              </p>
              <p>
                <strong>Your Responsibilities</strong>
                <br />
                - Ensure personal accuracy and do not share accounts.
                <br />
                - Only authorized drivers are to use the designated platforms.
                <br />- Understand local traffic, state and federal laws
                applying to you.
              </p>
            </div>
          </div>

          {/* Agree Button */}
          <button className="w-[200px] h-[48px] bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold rounded-[8px] text-[15px] transition-colors self-end mt-2">
            I agree
          </button>
        </div>
      </div>

      {/* Injected styles for the specific custom scrollbar to match design */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #d1d5db;
                    border-radius: 4px;
                }
            `,
        }}
      />
    </div>
  );
}
