"use client";

import Image from "next/image";

interface PartnerTrustCardProps {
  title: string;
  description: string;
  icon: string;
  bgColor?: string;
}

export default function PartnerTrustCard({
  title,
  description,
  icon,
  bgColor = "bg-[#F9EEEE]",
}: PartnerTrustCardProps) {
  return (
    <div
      className={`w-full max-w-[405px] h-[246px] rounded-[6px] ${bgColor}`}
    >
      <div className="p-[16px]">
        <div className="flex items-start gap-[14px]">
          {/* Icon */}
          <div className="w-[40px] h-[40px] rounded-[5px] overflow-hidden">
            <Image
              src={icon}
              width={500}
              height={500}
              className="w-full h-full object-cover"
              alt="card icon"
            />
          </div>

          {/* Title */}
          <h3 className="text-[#02093A] font-bold text-[20px] md:text-[24px] leading-[140%] tracking-[-2%] mb-[16px]">
            {title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-[16px] text-[#02093A] leading-[160%] tracking-[-2%] font-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
