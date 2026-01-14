"use client";

import Register from "@/app/components/forms/register/Register";

export default function Page(){
    return (
        <div className="">
            <div className="mb-8">
            <h2 className="text-center md:text-center lg:text-start">Create an account</h2>
            <p className="text-[#545454] text-[16px] md:text-[18px] text-center md:text-center lg:text-start">You&apos;ll need to verify this email for future important updates.</p>
            </div>
           
           <Register />
        </div>
    )
}