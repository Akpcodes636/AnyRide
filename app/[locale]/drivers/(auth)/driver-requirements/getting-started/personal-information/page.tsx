"use client";
import { useRouter } from "next/navigation";

const verifications = [
  {
    id: 1,
    label: "Driver's License",
    description: "Verify your driving license.",
    badge: { text: "Verification required", color: "bg-[#FEF5E7] border border-[#FEF5E7] text-[#F59E0B]" },
    route: "/drivers/verifications/drivers-license",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2" />
        <circle cx="8" cy="12" r="2" />
        <path d="M14 10h4M14 14h2" />
      </svg>
    ),
  },
  {
    id: 2,
    label: "National ID / Passport",
    description: "Verify you Identity or passport.",
    badge: { text: "Verified", color: "bg-[#E9F9EE] border border-[#22C553] text-green-600" },
    route: "/drivers/verifications/national-id",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 1 0 0 10A5 5 0 0 0 12 2z" />
        <path d="M3 21v-1a9 9 0 0 1 18 0v1" />
      </svg>
    ),
  },
  {
    id: 3,
    label: "Profile Photo (Selfie)",
    description: "Verify your profile picture.",
    badge: { text: "Verification required", color: "bg-[#FEF5E7] border border-[#F59E0B] text-[#F59E0B]" },
    route: "/drivers/verifications/profile-photo",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
      </svg>
    ),
  },
];

export default function VerificationsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto  py-[100px] ">
        <h2 className="font-bold text-[##02093A] mb-6">Verifications</h2>

        <div className="flex flex-col gap-3">
          {verifications.map((item) => (
            <button
              key={item.id}
              onClick={() => router.push(item.route)}
              className="w-full flex items-center justify-between bg-[#F5F5F7] border border-[#E5E7EB] hover:border-gray-300 transition-all rounded-[16px] px-[20px] py-4 text-left group cursor-pointer"
            >
              {/* Left: icon + text */}
              <div className="flex items-center gap-3">
                {/* Icon circle */}
                <div className="mt-0.5 w-[40px] h-[40px] rounded-full bg-[#E6E7ED] flex items-center justify-center text-gray-500 shrink-0">
                  {item.icon}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1">
                  <span className="text-[18px] font-semibold text-[#02093A] leading-snug">
                    {item.label}
                  </span>
                  <span className="text-[16px] text-[#353A61] leading-[120%] mb-[16px]">
                    {item.description}
                  </span>
                  <span
                    className={`mt-1 self-start text-[14px] font-medium px-2.5 py-0.5 rounded-full ${item.badge.color}`}
                  >
                    {item.badge.text}
                  </span>
                </div>
              </div>

              {/* Chevron */}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#9ca3af"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 ml-3 group-hover:stroke-gray-600 transition-colors"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}