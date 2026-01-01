"use client";
import Button from "../ui/Button";

const ContactHero =()=>{
  return (
    <section className="bg-contact pt-[280px] pb-[80px] md:pt-[330px] md:pb-[120px]">
      <div className="container">
        <div>
          <h2 className="text-white text-center w-full max-w-[250px] md:max-w-full lg:max-w-full mx-auto mb-[16px]">
            We&apos;re here to help
          </h2>
          <p className="text-[16px] md:text-[18px] text-[#E6E6EB] tracking-[-2%] font-normal w-full max-w-[337px] mx-auto text-center md:max-w-full lg:max-w-full mb-[40px]">
            Reach out to our team for any questions, concerns, or feedback.
          </p>
          <div className="flex items-center justify-center">
            <Button type="button" css="w-[171px] h-[62px]" style="danger">
              Chat with us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactHero;
