// "use client";
// // import LogoThumbnail from "@/components/ui/LogoThumbnail";
// // import { useResetState } from "@/hooks/useResetState.hook";
// // import { ArrowLeft, ArrowRight } from "lucide-react";
// import Image from "next/image";
// import { usePathname } from "next/navigation";

// export default function Layout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const pathname = usePathname();
//   //   useResetState();
//   //   console.log(pathname);

//   return (
//     // <div className="flex h-screen bg-white">
//     //   <div className="hide-scroll h-full flex-1 overflow-auto pb-20">
//     //     <section className="container px-4 pt-16 md:pt-8 lg:px-16">
//     //       <div className="mx-auto mt-8 max-w-96 lg:mt-16">{children}</div>
//     //     </section>
//     //   </div>
//     //       <div className="bg-red-800 h-screen flex-1">
//     //         <h1>Hello World</h1>
//     //       </div>

//     //   {/* <div className="hidden h-full flex-1 md:block">
//     //       <div className="h-full">
//     //         <Image
//     //           className="h-full object-cover transition"
//     //           src="/images/sign-up-Image.svg"
//     //           alt="Image"
//     //           height={1000}
//     //           width={1000}
//     //         />
//     //       </div>
//     //   </div>  */}
//     // </div>

//   <div className="flex h-screen bg-white items-stretch">
//   {/* LEFT */}
//   <div className="hidden md:flex lg:flex flex-1  relative">
//     <Image
//       src="/images/register.png"
//       alt="default image for register page"
//       fill
//       className="object-cover"
//       priority
//     />
//   </div>

//   {/* RIGHT */}
//   <div className="flex flex-1 h-full overflow-auto ">
//     <section className="w-full h-full pt-8 container mx-auto">
//       {children}
//     </section>
//   </div>
// </div>

//   );
// }


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
    pathname.endsWith("/register") || pathname.endsWith("/login");

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
