"use client";
import React from 'react';
import Header from "@/app/components/Header";
import TripHistoryScreen from "@/app/components/others_ui/trip_history/TripHistoryScreen";

export default function Page() {
    return (
        <>
            <Header />
            <div className="pt-[100px] bg-[#F5F5F7] min-h-screen">
                <TripHistoryScreen />
            </div>
        </>
    );
}
