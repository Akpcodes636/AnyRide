"use client";

import React from 'react';

export default function ProfilePhotoScreen() {
    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-4">
                Verify Profile Photo
            </h2>
            <p className="text-[#0B153D] text-[15px] font-medium mb-10">
                Take a clear selfie of yourself (guidelines shown).
            </p>

            <div className="flex flex-col items-center justify-center max-w-[500px] w-full mx-auto">
                {/* Selfie Camera Container */}
                <div className="relative w-full aspect-[4/3] bg-[#EAEBEF] rounded-[16px] overflow-hidden mb-6 flex items-center justify-center">
                    {/* Placeholder Face Image */}
                    <img
                        src="/images/Customer-1.jpg"
                        alt="Face verification"
                        className="w-full h-full object-cover"
                        onError={(e) => { e.currentTarget.src = "/images/About-rider.jpg"; }}
                    />

                    {/* Dark Overlay with Oval Cutout */}
                    <div className="absolute inset-x-0 inset-y-0 pointer-events-none flex items-center justify-center bg-black/10">
                        {/* The dashed oval guide */}
                        <div className="w-[60%] h-[75%] border-[3px] border-dashed border-white rounded-[50%] flex items-end justify-center pb-6">
                            <span className="bg-white/90 text-[#333333] text-[12px] font-bold px-4 py-1.5 rounded-full shadow-md backdrop-blur-sm">
                                Align your face in the Oval shape
                            </span>
                        </div>
                    </div>
                </div>

                {/* Take Selfie Button */}
                <button
                    className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white font-bold text-[16px] py-4 rounded-[12px] transition-colors mb-16 shadow-md"
                >
                    Take selfie
                </button>

                {/* Guidelines Box */}
                <div className="bg-[#FFF4F4] p-4 rounded-[8px] w-full text-left">
                    <p className="text-[12px] text-[#A06060] font-medium leading-[1.6]">
                        <span className="text-[#D32F2F] font-bold">Guidelines:</span> Driver was punctual, polite, and the car was very clean. Smooth and safe driving the whole way. Really appreciated the professionalism and friendly conversation. Would definitely ride again.
                    </p>
                </div>
            </div>
        </div>
    );
}
