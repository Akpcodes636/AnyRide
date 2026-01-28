"use client";
import Image from 'next/image';
import Link from 'next/link';


const Logo = () => {
  return (
    <Link href="/" className="h-full max-h-[40px]">
      <div className="h-[42px] min-w-[100px]  md:min-w-[150px] lg:min-w-[200px]">
        <Image
          src="/images/Logo-1.png"
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
