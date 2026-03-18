"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // Only apply split-screen to login/register pages (with locale)
  const isAuthPage =
    pathname.endsWith("/register/phone") || pathname.endsWith("/login") || pathname.endsWith("/register/create-account");

  if (isAuthPage) {
    return (
      <div className="flex h-screen bg-white items-stretch">
        {/* LEFT IMAGE */}
        <div className="hidden md:flex lg:flex flex-1 relative">
          <Image
            src="/images/register.png"
            alt="default image for register page"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-1 h-full overflow-auto">
          <section className="w-full h-full pt-8 container mx-auto">
            {children}
          </section>
        </div>
      </div>
    );
  }

  // Default layout for all other pages
  return <>{children}</>;
}
