"use client";

import React from 'react';

export default function DriversVerificationScreen() {
    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
            <div className="w-full max-w-[800px]">
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-6">
                    Driver's Verification
                </h2>
                <p className="text-[#666666] text-[15px] font-medium mb-8">
                    Driver's verification is what we help you caused by the use or inability to use the app.
                </p>

                <ul className="list-disc pl-5 space-y-4 text-[#666666] text-[15px] font-medium marker:text-[#666666]">
                    <li>
                        Using our app means you agree to play by the rules in these Terms.
                    </li>
                    <li>
                        Your content is yours — but by sharing it here, you give us permission to show it in the app.
                    </li>
                    <li>
                        We're not responsible for any losses or damages from using (or not being able to use) the app.
                    </li>
                    <li>
                        We may update these Terms from time to time. If you keep using the app after changes, that means you're cool with them.
                    </li>
                </ul>
            </div>
        </div>
    );
}
