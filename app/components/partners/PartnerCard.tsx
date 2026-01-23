"use client";
import Image from "next/image";

type PartnerCardProps = {
  img: string;
  title: string;
  description: string;
  alt?:string;
};

export default function PartnerCard({
  img,
  title,
  description,
  alt
}: PartnerCardProps) {
  return (
    <div className="bg-[#EBF3FE] w-full h-full rounded-[16px]">
      <div className="p-[40px]">
        <div className="w-[99px] h-[80px] rounded-[8px] mb-[16px]">
          <Image
            src={img}
            alt={ alt || title}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-[28px] md:text-[32px] leading-[120%] font-bold text-[#02093A] mb-[16px]">
          {title}
        </h3>

        <p className="text-[16px] text-[#555A7B] leading-[160%]">
          {description}
        </p>
      </div>
    </div>
  );
}
