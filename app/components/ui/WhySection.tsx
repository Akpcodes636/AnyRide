import { CiCircleCheck } from "react-icons/ci";
import { WhyContent } from "@/app/utils/Content";

export default function WhySection() {
  return (
    <div className="flex flex-wrap md:flex-nowrap lg:flex-nowrap  gap-[16px]">
      {WhyContent.map((item, index) => (
        <div
          key={index}
          className="bg-[#F9EEEE] w-full max-w-full md:max-w-full lg:max-w-full xl:max-w-[360px] h-[172px] rounded-[6px] mx-auto"
        >
          <div className="py-[16px] px-3">
            <h3 className="text-[24px] leading-[160%] tracking-[-2%] text-[#02093A] font-bold">
              {item.title}
            </h3>

            <p className="text-[16px] text-[#555A7B] tracking-[-2%] leading-[160%] font-normal mb-[16px]">
              {item.text}
            </p>

            {item.points.map((point, idx) => (
              <div key={idx} className="flex items-center gap-[8px]">
                <CiCircleCheck size={24} color="#EF4444" />
                <p className="text-[#555A7B] text-[16px] leading-[160%] tracking-[-2%]">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
