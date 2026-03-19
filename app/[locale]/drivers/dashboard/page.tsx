"use client";

import React from 'react';
import DashboardScreen from '@/app/components/others_ui/rider_to_driver/DashboardScreen';
import Header from '@/app/components/Header';

export default function DriverDashboardPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />
            <div className="pt-20">
                <DashboardScreen />
            </div>
        </main>
    );
}
