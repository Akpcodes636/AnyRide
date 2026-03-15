"use client";

import React, { useState } from 'react';
import { Send, MapPin, Trash2, ArrowRight } from 'lucide-react';

export default function SavedRidesScreen() {
    // Initial state matching the screenshot
    const [savedRides, setSavedRides] = useState([
        { id: 1, origin: 'Lagos Ikeja', destination: 'Tanscorp mall' },
        { id: 2, origin: 'Lagos Ikeja', destination: 'Tanscorp mall' },
        { id: 3, origin: 'Lagos Ikeja', destination: 'Tanscorp mall' },
        { id: 4, origin: 'Lagos Ikeja', destination: 'Tanscorp mall' },
        { id: 5, origin: 'Lagos Ikeja', destination: 'Tanscorp mall' },
        { id: 6, origin: 'Lagos Ikeja', destination: 'Tanscorp mall' },
        { id: 7, origin: 'Lagos Ikeja', destination: 'Tanscorp mall' },
        { id: 8, origin: 'Lagos Ikeja', destination: 'Tanscorp mall' },
        { id: 9, origin: 'Lagos Ikeja', destination: 'Tanscorp mall' },
        { id: 10, origin: 'Lagos Ikeja', destination: 'Tanscorp mall' },
    ]);

    const handleDelete = (idToRemove: number) => {
        setSavedRides(prev => prev.filter(ride => ride.id !== idToRemove));
    };

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 font-sans">
            <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none mb-10">
                Saved rides
            </h2>

            <div className="flex flex-col gap-4">
                {savedRides.map((ride) => (
                    <div
                        key={ride.id}
                        className="flex items-center justify-between bg-[#F5F5F7] rounded-[12px] px-6 py-4 hover:bg-[#EAEBEF] transition-colors"
                    >
                        <div className="flex items-center gap-3 sm:gap-6 w-full max-w-[400px]">
                            {/* Origin */}
                            <div className="flex items-center gap-2 flex-1">
                                <Send size={20} className="text-[#0B153D]" strokeWidth={1.5} />
                                <span className="text-[15px] font-semibold text-[#0B153D] truncate">{ride.origin}</span>
                            </div>

                            {/* Arrow Indicator */}
                            <div className="flex items-center justify-center flex-shrink-0">
                                <ArrowRight size={18} className="text-[#0B153D]" strokeWidth={2} />
                            </div>

                            {/* Destination */}
                            <div className="flex items-center gap-2 flex-1">
                                <MapPin size={20} className="text-[#0B153D]" strokeWidth={1.5} />
                                <span className="text-[15px] font-semibold text-[#0B153D] truncate">{ride.destination}</span>
                            </div>
                        </div>

                        {/* Delete Button */}
                        <button
                            onClick={() => handleDelete(ride.id)}
                            className="bg-transparent text-[#E53935] hover:text-[#c62828] p-2 rounded-full hover:bg-red-50 transition-colors ml-4 focus:outline-none"
                            aria-label="Delete saved ride"
                        >
                            <Trash2 size={20} strokeWidth={2} />
                        </button>
                    </div>
                ))}

                {savedRides.length === 0 && (
                    <div className="text-center py-10">
                        <p className="text-[#666666] text-[15px]">You have no saved rides left.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
