import { aboutContent } from "@/app/utils/Content";
import Image from "next/image";
// import { aboutContent } from "@/data/aboutContent";

export default function AboutCards() {
  return (
    <div className="w-full max-w-full mb-[28px]">
    <div className="flex flex-col md:flex-col lg:flex-col xl:flex-row gap-4">
      {aboutContent.map((item, index) => (
        <div
          key={index}
          className="flex flex-1 items-center gap-2.5 p-4 rounded-md"
          style={{ backgroundColor: item.color }}
        >
          <div className="w-[40px] h-[40px] rounded-[5px]">
            <Image
              src={item.img}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              alt={item.title}
            />
          </div>

          <div>
            <h3 className="text-[16px] md:text-[18px] text-text-accent font-bold leading-[160%] tracking-[-2%]">
              {item.title}
            </h3>
            <p className="font-normal text-[12px] md:text-[14px] leading-[160%] tracking-[-2%] text-[#8B8EA4]">
              {item.text}
            </p>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
