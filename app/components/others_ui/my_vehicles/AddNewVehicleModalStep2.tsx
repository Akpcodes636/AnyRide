"use client";

import React from 'react';
import { X, CloudUpload } from 'lucide-react';

interface Props {
    onNext: () => void;
    onClose: () => void;
}

export default function AddNewVehicleModalStep2({ onNext, onClose }: Props) {
    return (
        <div className="w-full max-w-5xl mx-auto font-sans bg-[#F5F5F7] min-h-[900px] flex items-center justify-center p-4">
            <div className="relative w-full max-w-[480px] bg-white rounded-[24px] p-6 md:p-10 shadow-xl border border-gray-100 mt-12 md:mt-0">
                {/* Close Button UI floating right outside */}
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 md:-top-14 md:right-0 w-10 h-10 bg-[#0B153D] rounded-full flex items-center justify-center text-white hover:bg-black transition-colors shadow-lg z-10"
                >
                    <X size={20} strokeWidth={2.5} />
                </button>

                <h2 className="text-[28px] font-extrabold text-[#333333] mb-6">
                    Add New Vehicle
                </h2>

                {/* Step Indicator */}
                <div className="bg-[#F5F5F7] rounded-[16px] p-4 flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 shrink-0 rounded-full border-[3px] border-[#0B153D] flex items-center justify-center bg-white">
                        <span className="text-[14px] font-bold text-[#0B153D]">2/2</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[16px] font-bold text-[#333333]">Upload Documents</span>
                        <span className="text-[12px] font-medium text-[#666666]">Input your car documents.</span>
                    </div>
                </div>

                {/* Upload Zones Container */}
                <div className="space-y-6 mb-10">

                    {/* Zone 1 */}
                    <div>
                        <span className="block text-[13px] font-semibold text-[#0B153D] mb-2 px-1">
                            Upload Car Photos (Front, Back, Side, Interior)
                        </span>
                        <div className="bg-[#F5F5F7] rounded-[12px] p-2">
                            <div className="border-2 border-dashed border-[#EAEBEF] rounded-[8px] bg-white flex flex-col items-center justify-center py-6 px-4 text-center cursor-pointer hover:border-[#0B153D] transition-colors">
                                <div className="mb-2 text-[#0B153D]">
                                    <CloudUpload size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[14px] font-bold text-[#333333] mb-1">
                                    Drag and drop files here
                                </h3>
                                <p className="text-[#A0A0A0] text-[10px] font-medium mb-1.5">
                                    Upload only files in PDF, DOC and DOCX format
                                </p>
                                <span className="text-[#0B153D] text-[12px] font-bold underline decoration-1 underline-offset-2 pointer-events-none">
                                    Or Choose a file
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Zone 2 */}
                    <div>
                        <span className="block text-[13px] font-semibold text-[#0B153D] mb-2 px-1">
                            Upload Vehicle license (Front and Back)
                        </span>
                        <div className="bg-[#F5F5F7] rounded-[12px] p-2">
                            <div className="border-2 border-dashed border-[#EAEBEF] rounded-[8px] bg-white flex flex-col items-center justify-center py-6 px-4 text-center cursor-pointer hover:border-[#0B153D] transition-colors">
                                <div className="mb-2 text-[#0B153D]">
                                    <CloudUpload size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[14px] font-bold text-[#333333] mb-1">
                                    Drag and drop files here
                                </h3>
                                <p className="text-[#A0A0A0] text-[10px] font-medium mb-1.5">
                                    Upload only files in PDF, PNG, DOC and DOCX format
                                </p>
                                <span className="text-[#0B153D] text-[12px] font-bold underline decoration-1 underline-offset-2 pointer-events-none">
                                    Or Choose a file
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Zone 3 */}
                    <div>
                        <span className="block text-[13px] font-semibold text-[#0B153D] mb-2 px-1">
                            Upload Insurance document
                        </span>
                        <div className="bg-[#F5F5F7] rounded-[12px] p-2">
                            <div className="border-2 border-dashed border-[#EAEBEF] rounded-[8px] bg-white flex flex-col items-center justify-center py-6 px-4 text-center cursor-pointer hover:border-[#0B153D] transition-colors">
                                <div className="mb-2 text-[#0B153D]">
                                    <CloudUpload size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-[14px] font-bold text-[#333333] mb-1">
                                    Drag and drop files here
                                </h3>
                                <p className="text-[#A0A0A0] text-[10px] font-medium mb-1.5">
                                    Upload only files in PDF, PNG, DOC and DOCX format
                                </p>
                                <span className="text-[#0B153D] text-[12px] font-bold underline decoration-1 underline-offset-2 pointer-events-none">
                                    Or Choose a file
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                <button
                    onClick={onNext}
                    className="w-full bg-[#0B153D] hover:bg-[#070e28] text-white font-bold text-[16px] py-4 rounded-[12px] transition-colors active:scale-[0.98] transform"
                >
                    Submit for Review
                </button>
            </div>
        </div>
    );
}
