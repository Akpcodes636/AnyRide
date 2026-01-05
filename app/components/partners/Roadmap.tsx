// import React from 'react';
// import { useTranslations } from 'next-intl';

// export default function Roadmap() {
//   const t = useTranslations("FleetPartnersPage.expansionRoadmap");
//   const stepsData = t.raw("steps") as Array<{title: string; description: string}>;

//   const roadmapSteps = stepsData.map((step, index) => ({
//     number: index + 1,
//     title: step.title,
//     subtitle: null,
//     description: step.description,
//     highlights: [],
//     align: index % 2 === 0 ? "right" : "left"
//   }));

//   return (
//     <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 bg-value py-12 sm:py-16 lg:py-20">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="text-center mb-12 lg:mb-16">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
//             {t("title")}
//           </h2>
//           <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
//             {t("description")}
//           </p>
//         </div>

//         {/* Timeline */}
//         <div className="relative">
//           {/* Timeline Line - Hidden on mobile, shown on md+ */}
//           <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-600 transform -translate-x-1/2"></div>

//           {/* Steps */}
//           <div className="space-y-8 lg:space-y-12">
//             {roadmapSteps.map((step, index) => (
//               <div key={index} className="relative">
//                 {/* Mobile Layout (Stacked) */}
//                 <div className="md:hidden">
//                   <div className="flex items-start gap-4 mb-4">
//                     <div className="flex-shrink-0 w-12 h-12 bg-[#F5F5F7] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
//                       {step.number}
//                     </div>
//                     <div className="flex-1">
//                       <h3 className="text-xl font-bold text-[#010418]">
//                         {step.title}
//                       </h3>
//                       {step.subtitle && (
//                         <span className="text-sm text-[#333333]">{step.subtitle}</span>
//                       )}
//                     </div>
//                   </div>
//                   <div className="bg-gray-100 rounded-xl p-6 ml-16">
//                     <p className="text-gray-700 text-sm mb-4 leading-relaxed">
//                       {step.description}
//                     </p>
//                     <ul className="space-y-2">
//                       {step.highlights.map((highlight, idx) => (
//                         <li key={idx} className="text-gray-700 text-sm flex items-start">
//                           <span className="text-red-600 mr-2 flex-shrink-0">•</span>
//                           <span>{highlight}</span>
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Desktop Layout (Alternating) */}
//                 <div className="hidden md:grid md:grid-cols-2 md:gap-8 lg:gap-12">
//                   {step.align === "right" ? (
//                     <>
//                       {/* Empty left space */}
//                       <div></div>
//                       {/* Content on right */}
//                       <div className="relative">
//                         <div className="bg-[#FFFFFF] rounded-xl p-[60px] shadow-xl">
//                           <div className="mb-4">
//                             <h3 className="text-[40px] tracking-[-5%] leading-[120%] font-bold text-gray-900">
//                               {step.title}
//                             </h3>
//                             {step.subtitle && (
//                               <span className="text-sm text-gray-600 font-semibold">
//                                 {step.subtitle}
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-gray-700 text-sm mb-4 leading-relaxed">
//                             {step.description}
//                           </p>
//                           <ul className="space-y-2">
//                             {step.highlights.map((highlight, idx) => (
//                               <li key={idx} className="text-gray-700 text-sm flex items-start">
//                                 <span className="text-red-600 mr-2 flex-shrink-0">•</span>
//                                 <span>{highlight}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     <>
//                       {/* Content on left */}
//                       <div className="relative">
//                         <div className="bg-[#FFFFFF] rounded-xl p-6 lg:p-8 shadow-xl">
//                           <div className="mb-4">
//                             <h3 className="text-[40px] tracking-[-5%] leading-[120%] font-bold text-gray-900">
//                               {step.title}
//                             </h3>
//                             {step.subtitle.includes && (
//                               <span className="text-sm text-gray-600 font-semibold">
//                                 {step.subtitle}
//                                 <ul>
//                                   <li>{step.includes}</li>
//                                 </ul>
//                               </span>
//                             )}
//                           </div>
//                           <p className="text-gray-700 text-sm mb-4 leading-relaxed">
//                             {step.description}
//                           </p>
//                           <ul className="space-y-2">
//                             {step.highlights.map((highlight, idx) => (
//                               <li key={idx} className="text-gray-700 text-sm flex items-start">
//                                 <span className="text-red-600 mr-2 flex-shrink-0">•</span>
//                                 <span>{highlight}</span>
//                               </li>
//                             ))}
//                           </ul>
//                         </div>
//                       </div>
//                       {/* Empty right space */}
//                       <div></div>
//                     </>
//                   )}
                  
//                   {/* Timeline Circle - Centered */}
//                   <div className="absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 border-4 border-gray-900">
//                     {step.number}
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import React from "react";
// import { useTranslations } from "next-intl";

// type RoadmapStep = {
//   title: string;
//   description: string;
//   includes?: string[];
//   footer?: string;
// };

// type MappedStep = {
//   number: number;
//   title: string;
//   description: string;
//   includes?: string[];
//   footer?: string;
//   align: "left" | "right";
// };

// export default function Roadmap() {
//   const t = useTranslations("FleetPartnersPage.expansionRoadmap");

//   // ✅ Raw data from i18n
//   const stepsData = t.raw("steps") as RoadmapStep[];

//   // ✅ Normalize steps (safe mapping)
//   const roadmapSteps: MappedStep[] = stepsData.map((step, index) => ({
//     number: index + 1,
//     title: step.title,
//     description: step.description,
//     includes: step.includes,
//     footer: step.footer,
//     align: index % 2 === 0 ? "right" : "left",
//   }));

//   return (
//     <section className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 py-12 sm:py-16 lg:py-20">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div className="text-center mb-12 lg:mb-16">
//           <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
//             {t("title")}
//           </h2>
//           <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
//             {t("description")}
//           </p>
//         </div>

//         {/* Timeline */}
//         <div className="relative">
//           {/* Timeline line */}
//           <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-red-600 -translate-x-1/2" />

//           {/* Steps */}
//           <div className="space-y-8 lg:space-y-12">
//             {roadmapSteps.map((step) => (
//               <div key={step.number} className="relative">

//                 {/* ================= MOBILE ================= */}
//                 <div className="md:hidden">
//                   <div className="flex items-start gap-4 mb-4">
//                     <div className="w-12 h-12 bg-[#F5F5F7] rounded-full flex items-center justify-center text-[#010418] font-bold text-xl shadow-lg">
//                       {step.number}
//                     </div>
//                     <h3 className="text-xl font-bold text-[#010418]">{step.title}</h3>
//                   </div>

//                   <div className="bg-gray-100 rounded-xl p-6 ml-16">
//                     <p className="text-gray-700 text-sm mb-4 leading-relaxed">{step.description}</p>

//                     {step.includes && (
//                       <ul className="space-y-2 mt-3">
//                         {step.includes.map((item, idx) => (
//                           <li key={idx} className="flex items-start text-sm text-gray-700">
//                             <span className="text-black mr-2">•</span>
//                             <span>{item}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     )}

//                     {step.footer && (
//                       <p className="mt-3 text-gray-500 text-sm">{step.footer}</p>
//                     )}
//                   </div>
//                 </div>

//                 {/* ================= DESKTOP ================= */}
//                 <div className="hidden md:grid md:grid-cols-2 md:gap-8 lg:gap-12">

//                   {/* Left Content */}
//                   {step.align === "right" && (
//                     <div className="bg-white rounded-xl p-8 shadow-xl">
//                       <h3 className="text-[40px] font-bold text-gray-900 mb-4 leading-tight">{step.title}</h3>
//                       <p className="text-gray-700 text-sm mb-4 leading-relaxed">{step.description}</p>

//                       {step.includes && (
//                         <ul className="space-y-2 mt-3">
//                           {step.includes.map((item, idx) => (
//                             <li key={idx} className="flex items-start text-sm text-gray-700">
//                               <span className="text-red-600 mr-2">•</span>
//                               <span>{item}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       )}

//                       {step.footer && (
//                         <p className="mt-3 text-gray-500 text-sm">{step.footer}</p>
//                       )}
//                     </div>
//                   )}

//                   {step.align === "right" && <div />}

//                   {/* Right Content */}
//                   {step.align === "right" && <div />}

//                   {step.align === "right" && (
//                     <div className="bg-white rounded-xl p-8 shadow-xl">
//                       <h3 className="text-[40px] font-bold text-gray-900 mb-4 leading-tight">{step.title}</h3>
//                       <p className="text-gray-700 text-sm mb-4 leading-relaxed">{step.description}</p>

//                       {step.includes && (
//                         <ul className="space-y-2 mt-3">
//                           {step.includes.map((item, idx) => (
//                             <li key={idx} className="flex items-start text-sm text-gray-700">
//                               <span className="text-red-600 mr-2">•</span>
//                               <span>{item}</span>
//                             </li>
//                           ))}
//                         </ul>
//                       )}

//                       {step.footer && (
//                         <p className="mt-3 text-gray-700 text-sm">{step.footer}</p>
//                       )}
//                     </div>
//                   )}

//                   {/* Timeline dot */}
//                   <div className="absolute left-1/2 top-8 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-gray-900 z-10">
//                     {step.number}
//                   </div>
//                 </div>

//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }
"use client";
import React from "react";
import { useTranslations } from "next-intl";

type RoadmapStep = {
  title: string;
  description: string;
  includes?: string[];
  footer?: string;
};

type MappedStep = {
  number: number;
  title: string;
  description: string;
  includes?: string[];
  footer?: string;
  align: "left" | "right";
};

export default function Roadmap() {
  const t = useTranslations("FleetPartnersPage.expansionRoadmap");

  // Raw data from i18n
  const stepsData = t.raw("steps") as RoadmapStep[];

  // Normalize steps and alternate alignment starting from right
  const roadmapSteps: MappedStep[] = stepsData.map((step, index) => ({
    number: index + 1,
    title: step.title,
    description: step.description,
    includes: step.includes,
    footer: step.footer,
    align: index % 2 === 0 ? "right" : "left",
  }));

  return (
    <section className="bg-value py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-[#FFFFFF] left-[20px] md:left-1/2 -translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-12">
            {roadmapSteps.map((step) => (
              <div
                key={step.number}
                className="relative md:grid md:grid-cols-2 gap-[10px] md:gap-8 lg:gap-[64px] items-start"
              >
                {/* Timeline number dot */}
                <span className="absolute top-40 -left-[20px] md:left-1/2 md:-translate-x-1/2 w-[74px] h-[74px] bg-[#A20602] rounded-full flex items-center justify-center text-white font-bold z-10 text-[20px] md:text-[40px]">
                  {step.number}
                </span>

                {/* Step content */}
                <div
                  className={`
                    order-1 
                    md:order-${step.align === "right" ? "1" : "2"}
                    w-full
                  `}
                >
                  <div className="bg-white rounded-xl p-6 lg:p-8 shadow-xl w-full max-w-[300px] sm:max-w-[550px]  md:max-w-full lg:max-w-full mx-auto ">
                    <h3 className="text-2xl lg:text-[40px] font-bold text-gray-900 mb-4 leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {step.includes && (
                      <ul className="space-y-2 mt-3">
                        {step.includes.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start text-sm text-gray-700"
                          >
                            <span className="text-red-600 mr-2">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {step.footer && (
                      <p className="mt-3 text-gray-500 text-sm">{step.footer}</p>
                    )}
                  </div>
                </div>

                {/* Spacer for opposite side on desktop */}
                <div
                  className={`order-2 md:order-${step.align === "right" ? "2" : "1"}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
