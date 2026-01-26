"use client";
import Image from "next/image";

interface OurMissionCardProps {
  img: string;
  title: string;
  text: string;
}

export default function OurMissionCard({
  img,
  title,
  text,
}: OurMissionCardProps) {
  return (
    <div className="w-full max-w-[620px] h-[346px] rounded-[16px] bg-[#F5F5F7B2]">
      <div className="p-[40px]">
        <div className="w-[99px] h-[80px] mb-[16px]">
          <Image
            src={img}
            alt={title}
            width={500}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-[20px] md:text-[32px] text-[#02093A] tracking-[-2%] leading-[120%] font-bold mb-[16px] w-full max-w-[439px]">
          {title}
        </h3>

        <p className="text-[#555A7B] text-[16px] leading-[160%] tracking-[-2%]">
          {text}
        </p>
      </div>
    </div>
  );
}
