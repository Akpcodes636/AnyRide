"use client";
import React from 'react';
import Button from '../ui/Button';
import { useRouter } from "next/navigation";

export default function Banner() {

   const router = useRouter();
      const gotoWaitlist = () => {
      router.push("/waitlist");
    };

  return (
    <div className="py-[78px] bg-black flex items-center justify-center p-4">
      <div className="container  text-center space-y-8">
        {/* Main Headline */}
        <h2 className="text-center text-white">
          Ready to scale your transport business?
        </h2>
        
        {/* Subheading */}
        <p className="text-lg md:text-xl text-[#E6E6E6] max-w-2xl mx-auto">
         Our team will guide you through every step.

        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Button type="button" style="danger"  css="w-[256px] h-[62px]" fn={gotoWaitlist}>
            Join Our Fleet Network
          </Button>
          
          <Button type="button" style="tertiary"  css="w-[256px] h-[62px]" fn={gotoWaitlist}>
            View Full Roadmap
          </Button>
        </div>
        
      
      </div>
    </div>
  );
}