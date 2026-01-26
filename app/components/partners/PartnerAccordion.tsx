"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
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

  // animated panel refs
  const contentRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const chevronRefs = useRef<Record<string, SVGSVGElement | null>>({});
  const listRefs = useRef<Record<string, HTMLLIElement[]>>({});
  const gridRefs = useRef<Record<string, HTMLDivElement[]>>({});

  // auto-close others
  const toggleSection = (section: string) => {
    setOpenSections((prev) => {
      const updated: Record<string, boolean> = {};
      Object.keys(prev).forEach((k) => {
        updated[k] = k === section ? !prev[k] : false;
      });
      return updated;
    });
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

  // 🔥 GSAP orchestration
  useEffect(() => {
    partners.forEach((partner) => {
      const panel = contentRefs.current[partner.id];
      const chevron = chevronRefs.current[partner.id];
      const lists = listRefs.current[partner.id];
      const grids = gridRefs.current[partner.id];

      if (!panel) return;

      if (openSections[partner.id]) {
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0 },
          {
            height: panel.scrollHeight,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
            overflow: "hidden",
          }
        );

        if (chevron) {
          gsap.to(chevron, {
            rotate: 180,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        if (lists?.length) {
          gsap.fromTo(
            lists,
            { opacity: 0, y: 10 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              delay: 0.15,
            }
          );
        }

        if (grids?.length) {
          gsap.fromTo(
            grids,
            { opacity: 0, y: 12 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.12,
              delay: 0.2,
            }
          );
        }
      } else {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });

        if (chevron) {
          gsap.to(chevron, {
            rotate: 0,
            duration: 0.25,
          });
        }
      }
    });
  }, [openSections, partners]);

  return (
    <div className="max-w-full mx-auto p-6 min-h-screen">
      <div className="space-y-3">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className="bg-[#F5F5F7] border border-gray-200 rounded-lg overflow-hidden"
          >
            {/* Collapsed Header */}
            {!openSections[partner.id] && (
              <button
                onClick={() => toggleSection(partner.id)}
                className="w-full px-6 py-6 text-left flex items-center justify-between"
              >
                <p className="text-[16px] md:text-[20px] font-semibold text-black leading-[120%] tracking-[-2%]">
                  {partner.subtitle}
                </p>

                <ChevronDown
                  ref={(el) => {
                    chevronRefs.current[partner.id] = el;
                  }}
                  className="w-5 h-5 text-gray-400 shrink-0"
                />
              </button>
            )}

            {/* Animated Panel */}
            <div
              ref={(el) => {
                contentRefs.current[partner.id] = el;
              }}
              style={{ height: 0, overflow: "hidden" }}
            >
              {openSections[partner.id] && (
                <div className="bg-[#F6E6E680]">
                  {/* Expanded Header */}
                  <div
                    onClick={() => toggleSection(partner.id)}
                    className="px-6 py-4 flex items-start gap-4 cursor-pointer"
                  >
                    <div
                      className={`${partner.bgColor} p-3 rounded-lg shrink-0`}
                    >
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
                    <div
                      ref={(el) => {
                        if (el) {
                          if (!gridRefs.current[partner.id]) {
                            gridRefs.current[partner.id] = [];
                          }
                          if (!gridRefs.current[partner.id].includes(el)) {
                            gridRefs.current[partner.id].push(el);
                          }
                        }
                      }}
                      className="bg-white p-5 rounded-lg"
                    >
                      <h4 className="font-semibold text-[#353A61] mb-4 text-[20px] md:text-[28px]">
                        {t("labels.whoIncludes")}
                      </h4>

                      <ul className="space-y-3">
                        {partner.includes.map((item, idx) => (
                          <li
                            key={idx}
                            ref={(el) => {
                              if (el) {
                                if (!listRefs.current[partner.id]) {
                                  listRefs.current[partner.id] = [];
                                }
                                if (!listRefs.current[partner.id].includes(el)) {
                                  listRefs.current[partner.id].push(el);
                                }
                              }
                            }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-[16px] text-[#555A7B]">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      ref={(el) => {
                        if (el) {
                          if (!gridRefs.current[partner.id]) {
                            gridRefs.current[partner.id] = [];
                          }
                          if (!gridRefs.current[partner.id].includes(el)) {
                            gridRefs.current[partner.id].push(el);
                          }
                        }
                      }}
                      className="bg-white p-5 rounded-lg"
                    >
                      <h4 className="font-semibold text-[#353A61] text-[20px] md:text-[28px] mb-4">
                        {t("labels.whyMatters")}
                      </h4>

                      <ul className="space-y-3">
                        {partner.matters.map((item, idx) => (
                          <li
                            key={idx}
                            ref={(el) => {
                              if (el) {
                                if (!listRefs.current[partner.id]) {
                                  listRefs.current[partner.id] = [];
                                }
                                if (!listRefs.current[partner.id].includes(el)) {
                                  listRefs.current[partner.id].push(el);
                                }
                              }
                            }}
                            className="flex items-start gap-2"
                          >
                            <span className="text-[16px] text-[#555A7B]">
                              {item}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}