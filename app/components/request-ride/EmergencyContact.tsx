"use client";
import Image from "next/image";
import Button from "../ui/Button";

export default function EmergencyContact() {
  return (
    <div className="mt-[16px]">
      <div className="bg-white shadow-lg px-[40px] py-[36px] flex items-center justify-between gap-[36px]">
        <div className="w-[112px] h-[142px]">
          <Image
            src="/images/badge.png"
            width={500}
            height={500}
            alt=""
            className="w-full h-full object-contain"
          />
        </div>
        <div className="b w-full">
          <h3 className="text-[#333333] text-[25px] tracking-[-4%] leading-[120%] w-full max-w-[191px] font-bold mb-[22px]">
            Share tracks to emergency list
          </h3>
          <Button type="button" style="pink" css="w-[227px] h-[48px]">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
