"use client";

import React, { useState } from 'react';
import AcceptWithScreen from '@/app/components/others_ui/driver_trip/AcceptWithScreen';
import AwaitingResponseScreen from '@/app/components/others_ui/driver_trip/AwaitingResponseScreen';
import RiderAssignedScreen from '@/app/components/others_ui/driver_trip/RiderAssignedScreen';
import TopUpWalletModal from '@/app/components/others_ui/driver_trip/TopUpWalletModal';
import OnTripScreen from '@/app/components/others_ui/driver_trip/OnTripScreen';
import TripCompletedModal from '@/app/components/others_ui/driver_trip/TripCompletedModal';
import { useRouter } from 'next/navigation';

type TripStep = 'incoming' | 'awaiting' | 'assigned' | 'on-trip';

export default function IncomingRequestPage() {
  const [currentStep, setCurrentStep] = useState<TripStep>('incoming');
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isCompletedOpen, setIsCompletedOpen] = useState(false);
  const router = useRouter();

  const handleAccept = () => {
    setCurrentStep('awaiting');
  };

  const handleDecline = () => {
    router.push("/drivers/availability");
  };

  const handleAwaitingToAssigned = () => {
    setCurrentStep('assigned');
  };

  const handlePickUp = () => {
    setCurrentStep('on-trip');
  };

  const handleEndTrip = () => {
    setIsCompletedOpen(true);
  };

  const handleFinish = () => {
    setIsCompletedOpen(false);
    router.push("/drivers/availability");
  };

  const resetFlow = () => {
    setCurrentStep('incoming');
  };

  return (
    <div className="relative">
      {currentStep === 'incoming' && (
        <AcceptWithScreen
          onAccept={handleAccept}
          onDecline={handleDecline}
          onToggleTopUp={() => setIsTopUpOpen(true)}
        />
      )}

      {currentStep === 'awaiting' && (
        <AwaitingResponseScreen
          onNext={handleAwaitingToAssigned}
        />
      )}

      {currentStep === 'assigned' && (
        <RiderAssignedScreen
          onBack={resetFlow}
          onPickUp={handlePickUp}
        />
      )}

      {currentStep === 'on-trip' && (
        <OnTripScreen
          onEndTrip={handleEndTrip}
        />
      )}

      {/* Modals */}
      <TopUpWalletModal
        isOpen={isTopUpOpen}
        onClose={() => setIsTopUpOpen(false)}
      />

      <TripCompletedModal
        isOpen={isCompletedOpen}
        onClose={handleFinish}
      />
    </div>
  );
}
