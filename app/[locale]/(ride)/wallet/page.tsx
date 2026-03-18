"use client";
import { useState } from "react";
import Header from "@/app/components/Header";
import WalletHero from "@/app/components/wallet/WalletHero";
import {
  useWalletStatus,
  useWalletBalance,
  useCustomerCard,
  useTransferFunds,
  useTopUpWallet,
  useSetupWallet,
  useLoginWallet,
} from "@/hooks/useRideHooks";
import { toast } from "sonner";

const Page = () => {
  const [showSetup, setShowSetup] = useState(false);
  const [showTopUp, setShowTopUp] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);

  // Wallet hooks
  const { data: walletStatus, isLoading: statusLoading } = useWalletStatus();
  const { data: walletBalance, isLoading: balanceLoading } = useWalletBalance();
  const { data: customerCard } = useCustomerCard();
  const transferFunds = useTransferFunds();
  const topUpWallet = useTopUpWallet();
  const setupWallet = useSetupWallet();
  const loginWallet = useLoginWallet();

  const handleSetup = (pin: string, phone: string, email?: string) => {
    setupWallet.mutate({ pin, phone_number: phone, email });
  };

  const handleLogin = (pin: string) => {
    loginWallet.mutate({ pin });
  };

  const handleTransfer = (recipient: string, amount: number, description?: string) => {
    transferFunds.mutate({ recipient_phone: recipient, amount, description });
  };

  const handleTopUp = (amount: number, paymentMethodId: string, description?: string) => {
    topUpWallet.mutate({ amount, payment_method_id: paymentMethodId, description });
  };

  if (statusLoading || balanceLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-500">Loading wallet...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <WalletHero />
    </>
  );
};

export default Page;
