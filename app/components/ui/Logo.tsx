"use client";
import Image from 'next/image';
import Link from 'next/link';


const Logo = () => {
  return (
    <Link href="/" className="h-12">
      <div className="h-full w-24.5 md:w-30 lg:w-42">
        <Image
          src="/icons/Logo.svg"
          height={200}
          width={200}
          alt="logo"
          className="h-full w-full object-contain"
        />
      </div>
    </Link>
  )
}

export default Logo;
