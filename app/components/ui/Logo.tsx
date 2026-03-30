"use client";
import Image from "next/image";
import { Link } from "@/i18n/navigation";

const Logo = () => {
  return (
    <Link href="/" className="h-full max-h-[40px]">
      <div className="h-[42px] w-[130px]  md:w-[150px] lg:w-[200px]">
        <Image
          src="/images/Logo-1.webp"
          width={200}
          height={60}
          alt="logo"
          sizes="(max-width: 768px) 130px, (max-width: 1024px) 150px, 200px"
          priority
          className="h-full w-full object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
