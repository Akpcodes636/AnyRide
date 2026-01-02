import React from 'react';
import { useTranslations } from 'next-intl';

export default function HowPartnershipWorks() {
  const t = useTranslations("FleetPartnersPage.howItWorks");
  const stepsData = t.raw("steps") as Array<{step: number; title: string; description?: string | string[]}>;
  
  const steps = stepsData.map((step, index) => ({
    number: `Step ${step.step}:`,
    title: step.title,
    description: typeof step.description === 'string' ? step.description : null,
    bullets: Array.isArray(step.description) ? step.description : undefined,
    color: "text-red-600"
  }));

  return (
    <div className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <span className="inline-block text-red-500 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-3">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {t("title")}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            {t("description")}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <span className={`${step.color} font-bold text-lg whitespace-nowrap`}>
                  {step.number}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {step.title}
                </h3>
              </div>
              
              {step.description && (
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed pl-0 sm:pl-16">
                  {step.description}
                </p>
              )}
              
              {step.bullets && (
                <ul className="space-y-2 pl-0 sm:pl-16 mt-3">
                  {step.bullets.map((bullet, idx) => (
                    <li key={idx} className="text-gray-600 text-sm sm:text-base flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}