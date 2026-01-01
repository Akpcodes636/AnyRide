import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";

export default function PartnerGrid() {
  return (
    <section className="w-full bg-white">
      <div className="container px-6">
        <div className="space-y-20">

          {/* Fleet Owners */}
          <div className="grid items-center gap-10 md:grid-cols-2">
            
            {/* Image */}
            <div className="relative order-1 h-[240px] w-full overflow-hidden rounded-lg md:order-2 md:h-[280px]">
              <Image
                src="/en/partners-1.png"
                alt="Fleet cars"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="order-2 md:order-1">
              <h3 className="mb-4 text-[32px] font-semibold text-[#0A0A23]">
                Fleet Owners
              </h3>

              <ul className="space-y-3 text-[16px] text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-red-500" />
                  <span>Manage multiple cars or motorcycles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-red-500" />
                  <span>Assign vehicles to drivers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-red-500" />
                  <span>Track performance and earnings</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Transport Companies */}
          <div className="grid items-center gap-10 md:grid-cols-2">
            
            {/* Image */}
            <div className="relative order-1 h-[240px] w-full overflow-hidden rounded-lg md:h-[280px]">
              <Image
                src="/en/partners-2.png"
                alt="Transport companies"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="order-2">
              <h3 className="mb-4 text-[32px] font-semibold text-[#0A0A23]">
                Transport Companies
              </h3>

              <ul className="space-y-3 text-[16px] text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-red-500" />
                  <span>Scale operations digitally</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-red-500" />
                  <span>Centralized reporting and payouts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-red-500" />
                  <span>Compliance-friendly onboarding</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Motorcycle Operators */}
          <div className="grid items-center gap-10 md:grid-cols-2">
            
            {/* Image */}
            <div className="relative order-1 h-[240px] w-full overflow-hidden rounded-lg md:order-2 md:h-[280px]">
              <Image
                src="/en/partner-3.png"
                alt="Motorcycle operators"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="order-2 md:order-1">
              <h3 className="mb-4 text-[32px] font-semibold text-[#0A0A23]">
                Motorcycle Operators
              </h3>

              <ul className="space-y-3 text-[16px] text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-red-500" />
                  <span>Ideal for quick city trips</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-red-500" />
                  <span>Optimized for bike-based mobility</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-red-500" />
                  <span>Lower operating costs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Individual Investors */}
          <div className="grid items-center gap-10 md:grid-cols-2">
            
            {/* Image */}
            <div className="relative order-1 h-[240px] w-full overflow-hidden rounded-lg md:h-[280px]">
              <Image
                src="/en/partners-4.png"
                alt="Individual investors"
                fill
                className="object-cover"
              />
            </div>

            {/* Text */}
            <div className="order-2">
              <h3 className="mb-4 text-[32px] font-semibold text-[#0A0A23]">
                Individual Investors
              </h3>

              <ul className="space-y-3 text-[16px] text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-red-500" />
                  <span>Own vehicles, assign drivers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-red-500" />
                  <span>Earn without driving yourself</span>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
