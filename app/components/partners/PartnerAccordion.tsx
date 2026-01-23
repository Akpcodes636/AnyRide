import { useState } from "react";
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

  const partners = [
    {
      id: "fuel",
      title: "Fuel & Energy Partners",
      subtitle: "Fuel & Energy",
      description: "Maximize your fleet's earning potential with guaranteed driver placements.",
      icon: Fuel,
      bgColor: "bg-red-700",
      includes: [
        "Fuel station networks",
        "Petroleum and energy companies",
        "Fuel card providers",
        "Energy distribution companies",
      ],
      matters: [
        "Fuel affordability for drivers",
        "Operational cost stability",
        "Driver retention and satisfaction",
      ],
    },
    {
      id: "compliance",
      title: "Compliance, Insurance & Risk Partners",
      subtitle: "Compliance / Insurance / Risk",
      description: "Ensure compliance and protect your business with comprehensive risk coverage.",
      icon: Shield,
      bgColor: "bg-blue-700",
      includes: [
        "Vehicle insurance providers",
        "Passenger and liability insurers",
        "Risk management firms",
        "Accident and claims administrators",
        "Safety audit firms",
      ],
      matters: [
        "Passenger and driver safety",
        "Regulatory compliance",
        "Platform risk mitigation",
      ],
    },
    {
      id: "driver",
      title: "Driver Associations & Transport Organizations",
      subtitle: "Driver Associations & Transport",
      description: "Support driver welfare and strengthen industry representation.",
      icon: Users,
      bgColor: "bg-green-700",
      includes: [
        "Taxi driver unions",
        "Motorcycle taxi associations",
        "Transport cooperatives",
        "Professional driver organizations",
      ],
      matters: [
        "Driver onboarding at scale",
        "Trust within local transport communities",
        "Operational legitimacy",
      ],
    },
    {
      id: "vehicle",
      title: "Vehicle Suppliers & Dealerships",
      subtitle: "Vehicle Suppliers & Dealerships",
      description: "Access quality vehicles and flexible financing for fleet expansion.",
      icon: Truck,
      bgColor: "bg-purple-700",
      includes: [
        "New and used vehicle dealerships",
        "Motorcycle and three-wheel suppliers",
        "Vehicle importers",
        "Fleet leasing and rental companies"
      ],
      matters: [
        "Fleet expansion",
        "Vehicle availability",
        "Standardization and quality control"
      ],
    },
    {
      id: "government",
      title: "Government & Regulatory Bodies",
      subtitle: "Government & Regulatory",
      description: "Navigate regulations and secure necessary operating permissions.",
      icon: Building2,
      bgColor: "bg-indigo-700",
      includes: [
        "Ministries of Transport",
        "Municipal transport authorities",
        "Road safety agencies",
        "Licensing and regulatory institutions"
      ],
      matters: [
        "Legal authorization to operate",
        "Policy alignment",
        "Long-term sustainability"
      ],
    },
    {
      id: "finance",
      title: "Banks & Financial Institutions",
      subtitle: "Banks & Financial Institutions",
      description: "Enable secure transactions and financial inclusion for drivers.",
      icon: Banknote,
      bgColor: "bg-teal-700",
      includes: [
        "Commercial banks",
        "Microfinance institutions",
        "Fleet financing providers",
        "Corporate banking partners"
      ],
      matters: [
        "Fleet owner financing",
        "Settlement and escrow accounts",
        "Financial credibility"
      ],
    },
    {
      id: "hardware",
      title: "Smartphone & Hardware Partners",
      subtitle: "Smartphone & Hardware",
      description: "Provide drivers with reliable devices and connectivity.",
      icon: Smartphone,
      bgColor: "bg-orange-700",
      includes: [
        "Smartphone manufacturers",
        "Mobile device distributors",
        "Hardware financing providers",
        "Telematics and vehicle hardware suppliers"
      ],
      matters: [
        "Driver device access",
        "Platform reliability",
        "Operational data collection",
      ],
    },
    {
      id: "mapping",
      title: "Mapping, Navigation & Local Data Partners",
      subtitle: "Mapping & Data",
      description: "Optimize routes and enhance customer experience with accurate navigation.",
      icon: Map,
      bgColor: "bg-cyan-700",
      includes: [
        "Mapping and GIS companies",
        "Local navigation data providers",
        "Urban planning and infrastructure data organizations",
        "Universities and research institutions"
      ],
      matters: [
        "Accurate pickups and drop-offs",
        "Reduced trip friction",
        "Improved customer experience",
        "Local market knowledge",
      ],
    },
    {
      id: "emergency",
      title: "Emergency & Safety Partners",
      subtitle: "Emergency & Safety",
      description: "Ensure rapid response and safety for drivers and passengers.",
      icon: AlertCircle,
      bgColor: "bg-rose-700",
      includes: [
        "Ambulance services",
        "Hospitals and clinics",
        "Private security firms",
        "Roadside assistance providers"
      ],
      matters: [
        "Emergency response readiness",
        "Passenger confidence",
        "Incident management"
      ],
    },
  ];

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
                      Who this includes:
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
                      Why they matter:
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