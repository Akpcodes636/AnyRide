"use client";

import React, { useState } from 'react';
import { ChevronDown, Send, MapPin, Star, Banknote, X } from 'lucide-react';

const RideCard = ({
    date,
    status,
    pickup,
    destination,
    onRateClick,
    onTipClick
}: {
    date: string;
    status: 'Completed' | 'Cancelled';
    pickup: string;
    destination: string;
    onRateClick: () => void;
    onTipClick: () => void;
}) => {
    return (
        <div className="bg-[#F5F5F7] rounded-[16px] p-4 flex flex-col gap-4 relative z-0">
            <div className="flex justify-between items-center">
                <span className="text-[14px] font-semibold text-[#333333]">{date}</span>
                <div className={`px-3 py-1 rounded-full border text-[12px] font-medium ${status === 'Completed' ? 'border-[#00b230] text-[#00b230]' : 'border-[#ff4d4f] text-[#ff4d4f]'}`}>
                    {status}
                </div>
            </div>

            <div className="flex flex-col gap-5 pl-2">
                <div className="flex gap-4">
                    <div className="mt-1">
                        <Send size={18} className="text-[#0B153D]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[12px] text-[#666666] mb-0.5">Pickup</span>
                        <span className="text-[15px] font-medium text-[#0B153D]">{pickup}</span>
                    </div>
                </div>

                <div className="flex gap-4">
                    <div className="mt-1">
                        <MapPin size={18} className="text-[#0B153D]" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[12px] text-[#666666] mb-0.5">Destination</span>
                        <span className="text-[15px] font-medium text-[#0B153D]">{destination}</span>
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-2">
                <button
                    onClick={onRateClick}
                    className="flex items-center gap-2 bg-[#EAEBEF] hover:bg-[#dfe0e5] rounded-[8px] px-4 py-2.5 text-[14px] font-medium text-[#0B153D] transition-colors shadow-sm"
                >
                    <Star size={16} fill="currentColor" className="text-[#0B153D]" /> Rate
                </button>
                <button
                    onClick={onTipClick}
                    className="flex items-center gap-2 bg-[#EAEBEF] hover:bg-[#dfe0e5] rounded-[8px] px-4 py-2.5 text-[14px] font-medium text-[#0B153D] transition-colors shadow-sm"
                >
                    <Banknote size={16} className="text-[#0B153D]" /> Tip
                </button>
                <button className="flex-1 bg-[#0B153D] hover:bg-[#070e28] text-white rounded-[8px] py-2.5 text-[14px] font-semibold transition-colors shadow-sm">
                    Repeat ride
                </button>
            </div>
        </div>
    );
}

export default function MyRidesScreen() {
    const [showTipModal, setShowTipModal] = useState(false);
    const [showRateModal, setShowRateModal] = useState(false);

    // Tip Modal State
    const [tipPercent, setTipPercent] = useState('20%');
    const [customTip, setCustomTip] = useState('');

    // Rate Modal State
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans relative">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-4">
                <h2 className="text-[32px] md:text-[40px] font-extrabold text-[#333333] leading-none">
                    My Rides
                </h2>
                <button className="flex items-center gap-2 bg-[#F5F5F7] hover:bg-[#EAEBEF] rounded-full px-5 py-2.5 text-[14px] font-medium text-[#666666] transition-colors">
                    This week <ChevronDown size={16} />
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">

                {/* Left content: Ride Cards */}
                <div className="flex-1 flex flex-col gap-6 w-full lg:max-w-[500px]">
                    <RideCard
                        date="Today"
                        status="Completed"
                        pickup="4827 Willowbrook Lane, OH 44126"
                        destination="123 Main St, Springfield, IL 62704"
                        onRateClick={() => setShowRateModal(true)}
                        onTipClick={() => setShowTipModal(true)}
                    />
                    <RideCard
                        date="Yesterday"
                        status="Completed"
                        pickup="4827 Willowbrook Lane, OH 44126"
                        destination="123 Main St, Springfield, IL 62704"
                        onRateClick={() => setShowRateModal(true)}
                        onTipClick={() => setShowTipModal(true)}
                    />
                    <RideCard
                        date="Sun, 25 Sept • 22:06"
                        status="Cancelled"
                        pickup="4827 Willowbrook Lane, OH 44126"
                        destination="123 Main St, Springfield, IL 62704"
                        onRateClick={() => setShowRateModal(true)}
                        onTipClick={() => setShowTipModal(true)}
                    />
                </div>

                {/* Right content: Promo Banner */}
                <div className="hidden lg:flex flex-col flex-1 w-full lg:max-w-[450px] min-h-[600px] h-full rounded-[24px] overflow-hidden relative group cursor-pointer shadow-lg ml-auto">
                    {/* Background Image Setup */}
                    <img
                        src="/images/Frame 2147227005.png"
                        alt="Next trip"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 absolute inset-0"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B153D] via-[#0B153D]/80 to-transparent"></div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col items-center text-center">
                        <h3 className="text-[36px] font-extrabold text-white leading-[1.1] mb-2">
                            Ready for your<br />next trip?
                        </h3>
                        <p className="text-white/90 text-[15px] mb-8">
                            You are just a click away
                        </p>
                        <button className="w-[80%] max-w-[300px] bg-[#c62828] hover:bg-[#a02020] text-white font-semibold py-4 rounded-[8px] text-[15px] transition-colors shadow-sm">
                            Book a ride
                        </button>
                    </div>
                </div>

            </div>

            {/* Modal Overlay Context */}
            {(showTipModal || showRateModal) && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 transition-opacity duration-300">

                    {/* TIP MODAL */}
                    {showTipModal && (
                        <div className="bg-white rounded-[24px] w-full max-w-[420px] p-6 relative flex flex-col items-center shadow-xl animate-in fade-in zoom-in duration-200">
                            <button
                                onClick={() => setShowTipModal(false)}
                                className="absolute right-5 top-5 w-8 h-8 bg-[#0B153D] text-white flex items-center justify-center rounded-full hover:bg-[#070e28] transition-colors"
                            >
                                <X size={18} strokeWidth={2.5} />
                            </button>

                            <h3 className="text-[#0B153D] text-[15px] font-medium mt-4">Enjoy the ride?</h3>
                            <h2 className="text-[28px] font-extrabold text-[#333333] mt-1 mb-6">Tip the driver</h2>

                            <span className="text-[12px] font-bold text-[#666666] tracking-wider mb-3">TIP WITH</span>

                            <div className="flex gap-3 mb-6">
                                {['10%', '20%', '50%', '100%'].map((perc) => (
                                    <button
                                        key={perc}
                                        onClick={() => { setTipPercent(perc); setCustomTip(''); }}
                                        className={`px-4 py-1.5 rounded-full text-[14px] font-semibold border ${tipPercent === perc && !customTip ? 'bg-[#0B153D] text-white border-[#0B153D]' : 'bg-transparent text-[#0B153D] border-[#0B153D] hover:bg-gray-100'} transition-colors`}
                                    >
                                        {perc}
                                    </button>
                                ))}
                            </div>

                            <span className="text-[12px] font-bold text-[#666666] tracking-wider mb-3">CUSTOM (INPUT PRICE)</span>

                            <div className="relative w-full max-w-[280px] mb-8">
                                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#999999] font-medium text-[15px]">CFD</span>
                                <input
                                    type="text"
                                    value={customTip}
                                    onChange={(e) => {
                                        setCustomTip(e.target.value);
                                        setTipPercent('');
                                    }}
                                    placeholder="Enter amount"
                                    className="w-full bg-[#F5F5F7] border-none rounded-[8px] pl-12 pr-4 py-3 h-[48px] focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[15px] font-semibold text-[#333]"
                                />
                            </div>

                            <div className="flex gap-4 w-full px-2">
                                <button
                                    onClick={() => setShowTipModal(false)}
                                    className="flex-1 bg-[#F5F5F7] hover:bg-[#EAEBEF] text-[#666666] font-semibold py-3.5 rounded-[12px] text-[15px] transition-colors"
                                >
                                    No, thanks
                                </button>
                                <button
                                    onClick={() => {
                                        console.log("Tip submitted");
                                        setShowTipModal(false);
                                    }}
                                    className="flex-1 bg-[#0B153D] hover:bg-[#070e28] text-white font-semibold py-3.5 rounded-[12px] text-[15px] transition-colors"
                                >
                                    Tip
                                </button>
                            </div>
                        </div>
                    )}


                    {/* RATE MODAL */}
                    {showRateModal && (
                        <div className="bg-white rounded-[24px] w-full max-w-[450px] p-6 relative flex flex-col items-center shadow-xl animate-in fade-in zoom-in duration-200">
                            <button
                                onClick={() => setShowRateModal(false)}
                                className="absolute right-5 top-5 w-8 h-8 bg-[#0B153D] text-white flex items-center justify-center rounded-full hover:bg-[#070e28] transition-colors"
                            >
                                <X size={18} strokeWidth={2.5} />
                            </button>

                            <h2 className="text-[28px] font-extrabold text-[#333333] text-center mt-6 mb-2 leading-[1.2]">
                                How was your <br />trip with Jacob?
                            </h2>
                            <p className="text-[14px] text-[#666666] text-center mb-8 px-4">
                                Your feedback helps improve our<br />service
                            </p>

                            <div className="flex gap-2 mb-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        onClick={() => setRating(star)}
                                        className="focus:outline-none transition-transform hover:scale-110"
                                    >
                                        <Star
                                            size={40}
                                            fill={star <= rating ? "#0B153D" : "#E5E7EB"}
                                            className={`${star <= rating ? "text-[#0B153D]" : "text-[#E5E7EB]"}`}
                                        />
                                    </button>
                                ))}
                            </div>
                            <span className="text-[12px] text-[#999999] mb-8">Tap on the stars to rate</span>

                            <div className="w-full flex flex-col gap-1.5 mb-6">
                                <div className="flex justify-between items-end px-1">
                                    <label className="text-[13px] font-bold text-[#333333]">Tell your experience <span className="font-normal text-[#999999]">(Optional)</span></label>
                                    <span className="text-[12px] text-[#999999]">{review.length}/200</span>
                                </div>
                                <textarea
                                    value={review}
                                    onChange={(e) => {
                                        if (e.target.value.length <= 200) {
                                            setReview(e.target.value);
                                        }
                                    }}
                                    placeholder="Write your review here..."
                                    className="w-full bg-[#F5F5F7] border-none rounded-[12px] px-4 py-4 h-[120px] resize-none focus:outline-none focus:ring-1 focus:ring-[#0B153D] text-[14px] text-[#333] placeholder-gray-400"
                                ></textarea>
                            </div>

                            <button
                                disabled={rating === 0}
                                onClick={() => {
                                    console.log("Review submitted", { rating, review });
                                    setShowRateModal(false);
                                }}
                                className={`w-full py-4 rounded-[12px] text-[15px] font-bold transition-colors ${rating > 0 ? 'bg-[#0B153D] hover:bg-[#070e28] text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            >
                                Submit review
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
