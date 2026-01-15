// "use client";
// import { CiCircleCheck } from "react-icons/ci";
// import SubTitle from "../ui/Subtitle";
// import Image from "next/image";
// import WhySection from "../ui/WhySection";

// export default function Why() {
//   return (
//     <section className="py-[32px] md:py-[50px] lg:py-[72px]">
//       <div className="container">
//         <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-x-[24px] gap-y-[24px]">
//         <div>
//           <div className="mb-[24px]">
//           <SubTitle text="Why both" />
//           </div>
//           <h2 className="mb-[32px]">
//             Cars and motorcycles aren&apos;t competing they&apos;re
//             complementary.
//           </h2>
//           <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] font-normal text-[#333333] mb-[24px] md:mb-[40px]">
//             In many cities, motorcycles are not an alternative — they&apos;re
//             essential. AnyRide supports both, giving riders choice and drivers
//             opportunity.
//           </p>
//           {/* <div className=" bg-[#F9EEEE] w-full max-w-[335px] h-[172px] rounded-[6px]">
//             <div className="p-[16px]">
//               <h3 className="text-[24px] leading-[160%] tracking-[-2%] text-[#02093A] font-bold">
//                 Car rides
//               </h3>
//               <p className="text-[16px] text-[#555A7B] tracking-[-2%] leading-[160%] font-normal mb-[16px]">
//                 Best for comfort
//               </p>
//               <div className="flex items-center gap-[8px]">
//                 <CiCircleCheck size={24} color="#EF4444" />
//                 <p className="text-[#555A7B] text-[16px] leading-[160%] tracking-[-2%]">
//                   More luggage / more space
//                 </p>
//               </div>
//               <div className="flex items-center gap-[8px]">
//                 <CiCircleCheck size={24} color="#EF4444" />
//                 <p className="text-[#555A7B] text-[16px] leading-[160%] tracking-[-2%]">
//                   Ideal for longer trips
//                 </p>
//               </div>
//             </div>
//           </div> */}
//           <WhySection />
//         </div>
//         <div className="h-[401px] md:h-[401px] lg:h-[645px]">
//           <Image
//             src="/images/About-girl.png"
//             width={500}
//             height={500}
//             alt="images of about"
//             className="w-full h-full object-cover object-top"
//           />
//         </div>

//         </div>
//       </div>
//     </section>
//   );
// }

"use client";
import { CiCircleCheck } from "react-icons/ci";
import SubTitle from "../ui/Subtitle";
import Image from "next/image";
import { useTranslations } from "next-intl";

interface BothModesOption {
  type: string;
  benefits: string[];
}

interface BothModes {
  title: string;
  subtitle: string;
  description: string;
  options: BothModesOption[];
}

export default function Why() {
  const t = useTranslations("AboutPage");

  // Get bothModes content
  const bothModes = t.raw("bothModes") as BothModes;

  return (
    <section className="py-[32px] md:py-[50px] lg:py-[72px]">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-x-[24px] gap-y-[24px]">
          <div>
            <div className="mb-[24px]">
              <SubTitle text={bothModes.title} />
            </div>
            <h2 className="mb-[32px]">
              {bothModes.subtitle}
            </h2>
            <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] font-normal text-[#333333] mb-[24px] md:mb-[40px]">
              {bothModes.description}
            </p>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bothModes.options.map((option, idx) => (
                <div
                  key={idx}
                  className="bg-[#F9EEEE] p-4 rounded-md shadow-sm"
                >
                  <h3 className="text-[24px] leading-[160%] tracking-[-2%] text-[#02093A] font-bold mb-2">
                    {option.type}
                  </h3>
                  <div className="space-y-2">
                    {option.benefits.map((benefit, benefitIdx) => (
                      <div key={benefitIdx} className="flex items-center gap-[8px]">
                        <CiCircleCheck size={24} color="#EF4444" className="flex-shrink-0" />
                        <p className="text-[#555A7B] text-[16px] leading-[160%] tracking-[-2%]">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-[401px] md:h-[401px] lg:h-[645px]">
            <Image
              src="/icons/About-girl.svg"
              width={500}
              height={500}
              priority
              alt={bothModes.title}
              className="w-full h-full aspect-square object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
}