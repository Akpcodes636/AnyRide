"use client";
import Button from "../ui/Button";

export default function CareersHero() {
  return (
    <section className="h-screen bg-career pt-[250px]  md:pt-[280px] lg:pt-[200px]">
      <div className="container mx-auto">
        <div className="flex items-center justify-center flex-col">
          <div className="">
            <h1 className="text-[40px] md:text-[50px] lg:text-[64px] text-white font-bold leading-[120%] tracking-[-5%] text-center w-full max-w-[735px]">
              Build the Future of Transportation With Us
            </h1>
            <p className="w-full max-w-[700px] tracking-[-2%] leading-[160%] mx-auto text-center text-white text-[16px] md:text-[18px]">
              We&apos;re looking for talented individuals with the skills,
              experience, and understanding needed to help operate and scale a
              modern transportation platform.
            </p>
          </div>
          <div className="pt-[20px] md:pt-[40px]">
            <Button style="danger" type="button" css="w-[187px] h-[62px]">
              Join Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
