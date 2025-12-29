"use client";
import Button from "../ui/Button";

export default function HeroSection() {
  return (
    <>
      <section className="bg-driver h-screen">
        <div className="container-sm">
          <div className="pt-[148px] md:pt-[250px] lg:pt-[300px]">
            <h1 className="text-[40px] text-text-white font-bold leading-[-120%] tracking-[-5%] text-center w-full max-w-[337px] mx-auto md:max-w-[500px] lg:max-w-[450px] mb-[8px]">
              Drive with freedom. Earn on your terms.
            </h1>
            <p className="text-[#E6E6EB] font-normal text-center leading-[-2%] w-full max-w-[337px] md:max-w-[500px] lg:max-w-[673px] mx-auto mb-[8px] md:mb-[40px]">
              Join AnyRide and earn more while staying in control of your time
              and rides.
            </p>
            <div className="flex items-center justify-center">
              <Button style="danger" css="w-[200px] h-[62px]" type="button">
                Become a driver
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
