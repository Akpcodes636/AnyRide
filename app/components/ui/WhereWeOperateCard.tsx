"use client";
import Image from "next/image";

type WhereWeOperateCardProps = {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
};

export default function WhereWeOperateCard({
  icon,
  title,
  subtitle,
  description,
}: WhereWeOperateCardProps) {
  return (
    <div className=" w-full max-w-full md:max-w-full lg:max-w-[405px] h-[195px] sm:h-[160px] md:h-[160px] lg:h-[200px] bg-[#F9EEEE] rounded-[6px] p-4">
      
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="w-[40px] h-[40px] rounded-[5px] flex items-center justify-center">
          <Image
            src={icon}
            width={20}
            height={20}
            alt={`${title} icon`}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Title + Subtitle */}
        <div className="flex flex-col">
          <h3 className="text-[24px] leading-[160%] tracking-[-2%] font-bold text-[#02093A]">
            {title}
          </h3>

          <p className="text-[16px] text-[#555A7B] leading-[160%] tracking-[-2%]">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-[16px] text-[#555A7B] leading-[160%] tracking-[-2%]">
        {description}
      </p>
    </div>
  );
}
