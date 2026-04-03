"use client";
import React from 'react';
import DriveAndEarnScreen from "@/app/components/others_ui/rider_to_driver/DriveAndEarnScreen";
import Header from "@/app/components/Header";

export default function Page() {
    return (
        <>
            <Header />
            <div className="pt-[100px]">
                <DriveAndEarnScreen />
            </div>
        </>
    );
}