"use client";

import React from 'react';
import { CloudUpload } from 'lucide-react';

export default function DrivingLicenseScreen() {
    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0B153D] leading-none mb-12">
                Driving license
            </h2>

            <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto w-full">
                <p className="text-[#666666] text-[16px] font-semibold mb-4 text-center">
                    Upload License Photo (front & back)
                </p>

                {/* Dropzone area */}
                <div className="bg-[#F5F5F7] w-full p-4 rounded-[16px] mb-6">
                    <div className="border-2 border-dashed border-[#EAEBEF] rounded-[12px] bg-white flex flex-col items-center justify-center py-12 px-4 text-center group cursor-pointer hover:border-[#0B153D] transition-colors">
                        <div className="mb-4 text-[#0B153D]">
                            <CloudUpload size={40} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-[18px] font-bold text-[#333333] mb-2">
                            Drag and drop files here
                        </h3>
                        <p className="text-[#A0A0A0] text-[14px] font-medium mb-3">
                            Upload only files in PDF, DOC and DOCX format
                        </p>
                        <span className="text-[#0B153D] text-[14px] font-bold underline decoration-2 underline-offset-4 pointer-events-none">
                            Or Choose a file
                        </span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    disabled
                    className="w-full bg-[#EAEBEF] text-[#A0A0A0] font-bold text-[16px] py-4 rounded-[12px] cursor-not-allowed mb-16"
                >
                    Submit
                </button>

                {/* Error / Note Box */}
                <div className="bg-[#FFF4F4] p-4 rounded-[8px] w-full text-left">
                    <p className="text-[12px] text-[#A06060] font-medium leading-[1.6]">
                        <span className="text-[#D32F2F] font-bold">Note:</span> Driver was punctual, polite, and the car was very clean. Smooth and safe driving the whole way. Really appreciated the professionalism and friendly conversation. Would definitely ride again.
                    </p>
                </div>
            </div>
        </div>
    );
}
