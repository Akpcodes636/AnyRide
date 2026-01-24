import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  ChevronUp,
  Fuel,
  Shield,
  Users,
  Truck,
  Building2,
  Banknote,
  Smartphone,
  Map,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

export default function PartnerAccordion() {
  const t = useTranslations("PartnerCategories");
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    fuel: false,
    compliance: false,
    driver: false,
    vehicle: false,
    government: false,
    finance: false,
    hardware: false,
    mapping: false,
    emergency: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const partnerKeys = [
    "fuel",
    "compliance",
    "driver",
    "vehicle",
    "government",
    "finance",
    "hardware",
    "mapping",
    "emergency",
  ];

  const iconMap: Record<string, any> = {
    fuel: Fuel,
    compliance: Shield,
    driver: Users,
    vehicle: Truck,
    government: Building2,
    finance: Banknote,
    hardware: Smartphone,
    mapping: Map,
    emergency: AlertCircle,
  };

  const colorMap: Record<string, string> = {
    fuel: "bg-red-700",
    compliance: "bg-blue-700",
    driver: "bg-green-700",
    vehicle: "bg-purple-700",
    government: "bg-indigo-700",
    finance: "bg-teal-700",
    hardware: "bg-orange-700",
    mapping: "bg-cyan-700",
    emergency: "bg-rose-700",
  };

  const partners = partnerKeys.map((key) => {
    const section = `accordion.${key}`;
    return {
      id: key,
      title: t(`${section}.title`),
      subtitle: t(`${section}.subtitle`),
      description: t(`${section}.description`),
      icon: iconMap[key],
      bgColor: colorMap[key],
      includes: t.raw(`${section}.includes`) as string[],
      matters: t.raw(`${section}.matters`) as string[],
    };
  });

  return (
    <div className="max-w-full mx-auto p-6 min-h-screen">
      <div className="space-y-3">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-[#F5F5F7] border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Collapsed Header - Only text, no icon */}
            {!openSections[partner.id as keyof typeof openSections] && (
              <button
                onClick={() => toggleSection(partner.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between"
              >
                <p className="text-[16px] md:text-[20px] font-semibold text-black leading-[120%] tracking-[-2%]">
                  {partner.subtitle}
                </p>
                <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
              </button>
            )}

            {/* Expanded Content */}
            {openSections[partner.id as keyof typeof openSections] && (
              <div className="bg-[#F6E6E680]">
                {/* Expanded Header with Icon, Title, Description and Chevron */}
                <div
                  onClick={() => toggleSection(partner.id)}
                  className="px-6 py-4 flex items-start gap-4 cursor-pointer"
                >
                  <div className={`${partner.bgColor} p-3 rounded-lg shrink-0`}>
                    <partner.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-[18px] md:text-[20px] font-bold text-[#02093A] leading-tight">
                      {partner.title}
                    </h3>
                    <p className="text-[16px] text-[#02093A] mt-1">
                      {partner.description}
                    </p>
                  </div>

                  <ChevronUp className="w-5 h-5 text-gray-400 shrink-0 mt-1" />
                </div>

                {/* Content Grid */}
                <div className="px-6 pb-6 grid md:grid-cols-2 gap-6">
                  {/* Who this includes */}
                  <div className="bg-white p-5 rounded-lg">
                    <h4 className="font-semibold text-[#353A61] mb-4 text-[20px] md:text-[28px]">
                      {t('labels.whoIncludes')}
                    </h4>
                    <ul className="space-y-3">
                      {partner.includes.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-6 h-6 shrink-0 mt-0.5">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#ef4444"
                                strokeWidth="2"
                              />
                              <path
                                d="M8 12l3 3 5-5"
                                stroke="#ef4444"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="text-[16px] text-[#555A7B]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Why they matter */}
                  <div className="bg-white p-5 rounded-lg">
                    <h4 className="font-semibold text-[#353A61] text-[20px] md:text-[28px] mb-4">
                      {t('labels.whyMatters')}
                    </h4>
                    <ul className="space-y-3">
                      {partner.matters.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-5 h-5 shrink-0 mt-0.5">
                            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                              <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="#ef4444"
                                strokeWidth="2"
                              />
                              <path
                                d="M8 12l3 3 5-5"
                                stroke="#ef4444"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>
                          <span className="text-[16px] text-[#555A7B]">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 