"use client";
import Image from 'next/image';
import { Link } from '@/i18n/navigation';


const Logo = () => {
  return (
    <Link href="/" className="h-full max-h-[40px]">
      <div className="h-[42px] w-[130px]  md:w-[150px] lg:w-[200px]">
        <Image
          src="/images/Logo-1.png"
          height={500}
          width={500}
          alt="logo"
          className="h-full w-full object-contain"
        />
      </div>
    </Link>
  )
}

export default Logo;
