"use client";

import React from 'react';
import { CloudUpload, Folder, XCircle } from 'lucide-react';

export default function NationalIdScreen() {
    return (
        <div className="w-full max-w-5xl mx-auto bg-white p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#0B153D] leading-none mb-12">
                National ID/Passport
            </h2>

            <div className="flex flex-col items-center justify-center max-w-[600px] mx-auto w-full">
                <p className="text-[#666666] text-[16px] font-semibold mb-4 text-center">
                    Upload your ID Card/Passport(front & back)
                </p>

                {/* Dropzone area and Uploading state wrapper */}
                <div className="bg-[#F5F5F7] w-full p-4 md:p-6 rounded-[16px] mb-6 flex flex-col gap-4">
                    <div className="border-2 border-dashed border-[#EAEBEF] rounded-[12px] bg-white flex flex-col items-center justify-center py-10 px-4 text-center group cursor-pointer hover:border-[#0B153D] transition-colors">
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

                    {/* Successfully Uploaded File */}
                    <div className="bg-white rounded-[12px] p-4 flex items-center justify-between border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 w-full mr-4">
                            <div className="text-[#3498DB]">
                                <Folder size={24} fill="currentColor" strokeWidth={1} />
                            </div>
                            <div className="flex flex-col flex-1 gap-1">
                                <span className="text-[14px] font-bold text-[#A0A0A0]">Front.doc</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[12px] font-bold text-[#666666]">1.6MB • Uploaded</span>
                                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden ml-2 relative">
                                        <div className="absolute top-0 left-0 h-full w-full bg-[#0B153D] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="text-[#A0A0A0] hover:text-[#333333] transition-colors focus:outline-none">
                            <XCircle size={18} />
                        </button>
                    </div>

                    {/* Uploading File */}
                    <div className="bg-white rounded-[12px] p-4 flex items-center justify-between border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 w-full mr-4">
                            <div className="text-[#3498DB]">
                                <Folder size={24} fill="currentColor" strokeWidth={1} />
                            </div>
                            <div className="flex flex-col flex-1 gap-1">
                                <span className="text-[14px] font-bold text-[#A0A0A0]">Back.doc</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-[12px] font-bold text-[#666666]">1.9MB • Uploading...</span>
                                    <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden ml-2 relative">
                                        <div className="absolute top-0 left-0 h-full w-[65%] bg-[#0B153D] rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="text-[#A0A0A0] hover:text-[#333333] transition-colors focus:outline-none">
                            <XCircle size={18} />
                        </button>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white font-bold text-[16px] py-4 rounded-[12px] transition-colors mb-16 shadow-md"
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
