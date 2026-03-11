"use client";
import Header from "@/app/components/Header";

export default function Page() {
  return (
    <section>
      <div>
        <Header />
        <div className="pt-[100px] container mx-auto">
          <h2>Driver&apos;s Verification</h2>
          <h3 className="text-[18px] font-normal leading-[140%] mb-[8px]">
            Driver&apos;s verification is what we help you caused by the use or
            inability to use the app.
          </h3>
          <ul className="list-disc pl-6 text-[18px] leading-[140%] text-[#55585E] font-normal space-y-3">
            <li>
              Using our app means you agree to play by the rules in these Terms.
            </li>

            <li>
              Your content is yours — but by sharing it here, you give us
              permission to show it in the app.
            </li>

            <li>
              We&apos;re not responsible for any losses or damages from using
              (or not being able to use) the app.
            </li>

            <li>
              We may update these Terms from time to time. If you keep using the
              app after changes, that means you&apos;re cool with them.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
