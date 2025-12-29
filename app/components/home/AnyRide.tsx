"use client";
import Image from "next/image";
import { Star } from "lucide-react";

const AnyRide = () => {
  return (
    <section className="">
      <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <div className="h-full">
          <Image
            src="/images/Anyride.png"
            width={500}
            height={500}
            alt="AnyRide app"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-full pt-8.25 md:pt-49.25 px-5.75 pb-10">
          <h2 className="mb-6">Download AnyRide app</h2>
          <p className="text-[16px] md:text-[18px] leading-[160%] tracking-[-2%] text-gray-400 mb-8">
            Anyride gets you where you need to go for less. The app
            automatically calculates your ride cost and shows your car on the
            map in real time. It&apos;s fast, easy, and works with iOS and
            Android.
          </p>

          <div className="flex items-start justify-start gap-4 mb-6">
            <div className="w-33.75 h-10 rounded-[5px]">
              <Image
                src="/icons/apple.svg"
                width={500}
                height={500}
                className="w-full h-full object-cover"
                alt="apple store"
              />
            </div>
            <div className="w-33.75 h-10 rounded-[5px]">
              <Image
                src="/icons/google.svg"
                width={500}
                height={500}
                className="w-full h-full object-cover"
                alt="google play store"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Images */}
            <div className="w-19 h-8">
              <Image
                src="/images/pictures.png"
                width={500}
                height={500}
                className="w-full h-full object-cover"
                alt="picture of people that has downloaded the app"
              />
            </div>

            {/* Text */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                {/* Stars */}
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]"
                    />
                  ))}
                </div>

                <p className="font-sora font-medium text-[14px] leading-5 tracking-[0.14px] text-black">
                  4.9 reviews
                </p>
              </div>

              <p className="font-sora font-normal text-[13px] leading-[20.8px] tracking-[0.13px] text-black">
                Trusted by 1125+ Users
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AnyRide;
