"use client";

import { useState } from "react";
import Button from "../ui/Button";
import InputField from "../ui/InputField";
import { useRouter } from "next/navigation";
import { useWalletBalance, useTopUpWallet, useTransferFunds } from "@/hooks/useRideHooks";
import { toast } from "sonner";

export default function AddFund() {
  const router = useRouter();
  const [amount, setAmount] = useState<string>("");
  const [isTransfer, setIsTransfer] = useState<boolean>(false);
  const [recipient, setRecipient] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // Wallet hooks
  const { data: walletBalance } = useWalletBalance();
  const topUpWallet = useTopUpWallet();
  const transferFunds = useTransferFunds();

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    const numericValue = value.replace(/[^0-9.]/g, "");
    setAmount(numericValue);
  };

  const handleProceed = () => {
    const numAmount = parseFloat(amount);
    
    if (!numAmount || numAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (isTransfer) {
      if (!recipient) {
        toast.error("Please enter recipient phone number");
        return;
      }
      
      // Handle transfer
      transferFunds.mutate({
        recipient_phone: recipient,
        amount: numAmount,
        description: description || "Fund transfer"
      });
    } else {
      // Handle top-up - navigate to payment method selection
      router.push(`/wallet/add-funds/payment-method?amount=${numAmount}`);
    }
  };

  const toggleMode = () => {
    setIsTransfer(!isTransfer);
    setRecipient("");
    setDescription("");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[#555A7B] font-normal text-[18px] leading-[120%]">
          {isTransfer ? "Transfer funds" : "Amount to fund"}
        </p>
        <button
          onClick={toggleMode}
          className="text-blue-600 text-sm hover:text-blue-800 transition-colors"
        >
          {isTransfer ? "Switch to Top Up" : "Switch to Transfer"}
        </button>
      </div>
      
      {walletBalance && (
        <p className="text-sm text-gray-600 mb-4">
          Current balance: {walletBalance?.balance ? `${walletBalance.balance.toFixed(2)} ${walletBalance.currency || 'USD'}` : 'Loading...'}
        </p>
      )}

      <InputField
        name="amount"
        label={isTransfer ? "Transfer Amount" : "Top-up Amount"}
        value={amount}
        onChange={handleAmountChange}
        placeholder="0.00"
        type="text"
      />

      {isTransfer && (
        <>
          <InputField
            name="recipient"
            label="Recipient Phone Number"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="+1234567890"
            type="tel"
          />
          
          <InputField
            name="description"
            label="Description (Optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What's this for?"
            type="text"
          />
        </>
      )}

      <Button
        type="button"
        style="primary"
        css="w-full h-[57px] rounded-[12px] mt-[10px]"
        fn={handleProceed}
        disabled={topUpWallet.isPending || transferFunds.isPending}
      >
        {topUpWallet.isPending || transferFunds.isPending 
          ? (isTransfer ? "Transferring..." : "Processing...")
          : "Proceed"
        }
      </Button>
    </div>
  );
}
