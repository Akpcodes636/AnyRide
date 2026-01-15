import { CheckCircleIcon } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function PartnerGrid() {
  const t = useTranslations("FleetPartnersPage.whoCanPartner");
  const categories = t.raw("categories") as Array<{type: string; description: string[]}>;
  console.log(categories);
  
  return (
    <section className="w-full bg-white">
      <div className="container px-6">
        <div className="space-y-20">
          {categories.map((category, index) => (
            <div key={index} className={`grid items-center gap-10 md:grid-cols-2 ${index % 2 === 0 ? "" : ""}`}>
              
              {/* Image */}
              <div className={`relative order-1 h-[240px] w-full overflow-hidden rounded-lg ${index % 2 === 0 ? "md:order-2" : ""} md:h-[280px]`}>
                <Image
                  src={`/en/partners-${index + 1}.svg`}
                  alt={category.type}
                  priority
                  fill
                  className="object-cover"
                />
              </div>

              {/* Text */}
              <div className={`${index % 2 === 0 ? "order-2 md:order-1" : "order-2"}`}>
                <h3 className="mb-4 text-[32px] font-semibold text-[#0A0A23]">
                  {category.type}
                </h3>

                <ul className="space-y-3 text-[16px] text-gray-600">
                  {category.description.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircleIcon className="h-5 w-5 text-red-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
