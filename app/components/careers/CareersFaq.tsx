"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";
import {
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Fuel,
  Shield,
  Users,
  Truck,
  Building2,
  Banknote,
  Smartphone,
  Map,
  AlertCircle,
} from "lucide-react";

type SectionKey =
  | "fuel"
  | "compliance"
  | "driver"
  | "vehicle"
  | "government"
  | "finance"
  | "hardware"
  | "mapping"
  | "emergency";

export default function CareersFaq() {
  const t = useTranslations("CareerFaq");

  const keys: SectionKey[] = [
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

  const [open, setOpen] = useState<Record<SectionKey, boolean>>({
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

  const panels = useRef<Record<SectionKey, HTMLDivElement | null>>({} as any);
  const chevrons = useRef<Record<SectionKey, SVGSVGElement | null>>({} as any);
  const contentRefs = useRef<Record<SectionKey, HTMLDivElement | null>>({} as any);

  const toggle = (id: SectionKey) => {
    setOpen((prev) => {
      const next = { ...prev };
      keys.forEach((k) => (next[k] = k === id ? !prev[k] : false));
      return next;
    });
  };

  const partners = useMemo(
    () =>
      keys.map((id) => {
        const base = `accordion.${id}`;
        return {
          id,
          title: t(`${base}.title`),
          subtitle: t(`${base}.subtitle`),
          description: t(`${base}.description`),
        };
      }),
    [t, keys]
  );

  useEffect(() => {
    partners.forEach(({ id }) => {
      const panel = panels.current[id];
      const chevron = chevrons.current[id];
      const content = contentRefs.current[id];

      if (!panel) return;

      if (open[id]) {
        gsap.fromTo(
          panel,
          { height: 0, opacity: 0 },
          {
            height: panel.scrollHeight,
            opacity: 1,
            duration: 0.45,
            ease: "power2.out",
          }
        );

        chevron &&
          gsap.to(chevron, {
            rotate: 180,
            duration: 0.3,
          });

        if (content) {
          gsap.fromTo(
            content,
            { y: 12, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, delay: 0.2 }
          );
        }
      } else {
        gsap.to(panel, {
          height: 0,
          opacity: 0,
          duration: 0.3,
        });

        chevron &&
          gsap.to(chevron, {
            rotate: 0,
            duration: 0.2,
          });
      }
    });
  }, [open, partners]);

  return (
    <div className="w-full min-h-screen py-12 px-4">
      <div className="container mx-auto">

        {/* Accordion Items */}
        <div className="space-y-2">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
            >
              {!open[partner.id] && (
                <button
                  onClick={() => toggle(partner.id)}
                  className="w-full px-5 py-6 flex items-center justify-between text-left"
                >
                  <span className="text-[15px] md:text-[20px] font-bold text-black">
                    {partner.subtitle}
                  </span>
                  <ChevronDown
                    ref={(el) => {
                      chevrons.current[partner.id] = el;
                    }}
                    className="w-5 h-5 text-gray-400 shrink-0"
                  />
                </button>
              )}

              <div
                ref={(el) => {
                  panels.current[partner.id] = el;
                }}
                style={{ height: 0, overflow: "hidden" }}
              >
                {open[partner.id] && (
                  <div>
                    <div
                      onClick={() => toggle(partner.id)}
                      className="px-5 py-6 flex items-start justify-between gap-3 cursor-pointer"
                    >  
                    <div className="flex items-center justify-between gap-2">
                       <div className="bg-[#00D9A5] rounded-lg p-2.5 shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-white stroke-[2.5]" />
                       </div>
                      <h3 className="text-[16px] md:text-[20px] lg:text-[32px] font-bold text-[#000000]">
                        {partner.title}
                      </h3>
                    </div>
                      <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                    </div>

                    <div
                      ref={(el) => {
                        contentRefs.current[partner.id] = el;
                      }}
                      className="px-5 y-4"
                    >
                      <p className="text-[16px] md:text-[18px] text-[#545454] leading-[160%] tracking-[-2%]">
                        {partner.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}