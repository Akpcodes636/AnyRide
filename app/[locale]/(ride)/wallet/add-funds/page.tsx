"use client";
import React from 'react';
import Header from "@/app/components/Header";
import FundWalletScreen from "@/app/components/others_ui/wallet_rider/FundWalletScreen";

export default function Page() {
    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto py-10 pt-32">
                <Header />
                <FundWalletScreen />
            </main>
        </div>
    );
}