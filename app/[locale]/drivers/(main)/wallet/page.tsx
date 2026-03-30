"use client";

import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import { useState } from "react";
import WithdrawModal from "@/app/components/modals/WithdrawModal";
import { useTripModal } from "@/store/Modals";
import { useWalletBalance, useTransactionHistory } from "@/hooks/useRideHooks";
// import { Button } from "@/app/components/ui/Button";
import { ArrowUpRight, ArrowDownRight,  Wallet2 } from "lucide-react";
import { Transaction, TransactionCardProps, WalletBalanceResponse } from "@/types";
import Button from "@/app/components/ui/Button";

interface TransactionDisplay {
  id: number;
  route: string;
  detail: string;
  amount: string;
  status: string;
  positive: boolean;
  created_at: string;
}

export default function Wallet() {
  const { modal, closeModal } = useTripModal();
  const { data: walletData, isLoading: walletLoading, error: walletError } = useWalletBalance();
  const { data: transactionsData, isLoading: transactionsLoading, error: transactionsError } = useTransactionHistory();
  
  // Transform API data to match our interface
  const earningHistory: TransactionDisplay[] = transactionsData?.map((transaction: Transaction) => ({
    id: transaction.id,
    route: transaction.ride?.pickup_address ? `${transaction.ride.pickup_address} to ${transaction.ride.dropoff_address || "Destination"}` : "Wallet Transaction",
    detail: transaction.description || `${transaction.transaction_type} · ${new Date(transaction.created_at).toLocaleDateString()} · ${new Date(transaction.created_at).toLocaleTimeString()}`,
    amount: `${transaction.amount > 0 ? "+" : "-"}CF ${Math.abs(transaction.amount)}`,
    status: transaction.status || "Completed",
    positive: transaction.amount > 0,
    created_at: transaction.created_at,
  })) || [];

  const balance: number = walletData?.balance || 0;
  const totalEarnings: number = earningHistory.filter(t => t.positive).reduce((sum, t) => sum + parseFloat(t.amount.replace(/[^\d.-]/g, '')), 0);
  const totalWithdrawals: number = Math.abs(earningHistory.filter(t => !t.positive).reduce((sum, t) => sum + parseFloat(t.amount.replace(/[^\d.-]/g, '')), 0));

  if (walletLoading || transactionsLoading) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-[100px]">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="h-32 bg-gray-200 rounded-xl mb-6"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-[80px] bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (walletError || transactionsError) {
    return (
      <>
        <Header />
        <div className="container mx-auto py-[100px]">
          <div className="text-center">
            <h2 className="text-red-600 mb-4">Failed to load wallet data</h2>
            <p className="text-gray-600">Please try again later.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <WithdrawModal />

      <div className="container mx-auto py-[100px]">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg sm:text-xl font-semibold">Wallet</h2>
        </div>

        {/* Balance Card */}
        <div className="bg-[#010C4A] text-white rounded-[20px] p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Wallet2 size={24} />
              <span className="text-sm opacity-80">Available Balance</span>
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">CF</span>
            </div>
          </div>
          <div className="text-3xl font-bold mb-2">CF {balance.toLocaleString()}</div>
          <div className="text-sm opacity-80">Last updated: {new Date().toLocaleString()}</div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Button
            type="button"
            style="primary"
            css="bg-[#010C4A] text-white py-3 rounded-xl flex items-center justify-center gap-2"
            fn={() => closeModal()}
          >
            <ArrowUpRight size={20} />
            Withdraw
          </Button>
          <Button
            type="button"
            style="secondary"
            css="bg-[#F5F5F7] text-[#010C4A] py-3 rounded-xl flex items-center justify-center gap-2"
          >
            <ArrowDownRight size={20} />
            Add Funds
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#F5F7FA] p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <ArrowUpRight size={16} className="text-green-600" />
              <span className="text-sm text-gray-600">Total Earnings</span>
            </div>
            <div className="text-xl font-bold text-green-600">+CF {totalEarnings.toLocaleString()}</div>
          </div>
          <div className="bg-[#F5F7FA] p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <ArrowDownRight size={16} className="text-red-600" />
              <span className="text-sm text-gray-600">Total Withdrawals</span>
            </div>
            <div className="text-xl font-bold text-red-600">-CF {totalWithdrawals.toLocaleString()}</div>
          </div>
        </div>

        {/* Earning History */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Earning History</h3>
          
          {earningHistory.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wallet2 size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No transactions yet</h3>
              <p className="text-gray-600">Your wallet transactions will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {earningHistory.map((transaction: TransactionDisplay) => (
                <div
                  key={transaction.id}
                  className="bg-[#F5F5F7] p-4 rounded-xl flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      transaction.positive ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {transaction.positive ? (
                        <ArrowUpRight size={16} className="text-green-600" />
                      ) : (
                        <ArrowDownRight size={16} className="text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{transaction.route}</p>
                      <p className="text-sm text-gray-600">{transaction.detail}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${transaction.positive ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}