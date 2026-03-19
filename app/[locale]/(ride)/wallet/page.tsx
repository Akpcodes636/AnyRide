import React from 'react';
import WalletScreen from '@/app/components/others_ui/wallet_rider/WalletScreen';
import Header from '@/app/components/Header';

export default function WalletPage() {
    return (
        <div className="min-h-screen bg-white">
            <main className="container mx-auto py-10 pt-32">
                <Header />
                <WalletScreen />
            </main>
        </div>
    );
}