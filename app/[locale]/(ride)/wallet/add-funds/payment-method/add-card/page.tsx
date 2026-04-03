"use client";
import React from 'react';
import Header from "@/app/components/Header";
import AddCardScreen from "@/app/components/others_ui/wallet_rider/AddCardScreen";

export default function Page() {
    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto py-10 pt-32">
                <Header />
                <AddCardScreen />
            </main>
        </div>
    );
}
