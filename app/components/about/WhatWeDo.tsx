"use client";
import SubTitle from "../ui/Subtitle";

export default function WhatWeDo() {
  return (
    <section className="bg-[#010418]">
      <div className="container">
        <div className="flex items-center justify-center flex-col py-[32px]">
            <div className="mb-[8px]">
        <SubTitle
          text="What we do"
          css="font-bold text-[16px] text-[#C15855]"
        />

            </div>
        <h2 className="text-white text-center mb-[32px]">What is AnyRide?</h2>
        <p className="text-center text-[#E6E6E6] text-[18px] leading-[160%] tracking-[-2%] font-normal">
          AnyRide is more than just another ride-hailing app — it&apos;s a movement
          built around freedom, trust, and everyday convenience. We started
          AnyRide with one simple goal: to make movement across cities easier,
          safer, and more rewarding for everyone — whether you&apos;re catching a
          quick ride or earning behind the wheel. We understand what it means to
          hustle, to move, and to make things happen — that&apos;s why AnyRide was
          created to serve real people with real needs. Our platform connects
          riders and drivers in seconds, helping both sides save time, earn
          more, and move confidently through their day.
        </p>

        </div>
      </div>
    </section>
  );
}
