"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../ui/Button";
import LoadingBar from "../LoadingBar";
import { useRideStore } from "@/store/rideStore";
import { useRideRequestById, useAcceptRideRequest, useRejectRideRequest } from "@/hooks/useRideHooks";
import { toast } from "sonner";

export default function AcceptingOffer() {
  const next = useRideStore((s) => s.next);
  const rideData = useRideStore((s) => s.rideData);
  const requestId = rideData.requestId;

  const [elapsed, setElapsed] = useState<number>(0);
  
  // Get ride request data
  const { data: rideRequest, isLoading } = useRideRequestById(requestId);
  const acceptRide = useAcceptRideRequest();
  const rejectRide = useRejectRideRequest();

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-advance when ride is accepted
  useEffect(() => {
    if (rideRequest?.status === "accepted") {
      next();
    }
  }, [rideRequest?.status, next]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleAccept = () => {
    if (!requestId) {
      toast.error("No active ride request.");
      return;
    }

    acceptRide.mutate(requestId, {
      onSuccess: () => {
        toast.success("Ride accepted!");
        next();
      },
      onError: (error) => {
        toast.error("Failed to accept ride");
        console.error("Accept ride error:", error);
      }
    });
  };

  const handleReject = () => {
    if (!requestId) {
      toast.error("No active ride request.");
      return;
    }

    rejectRide.mutate({ 
      requestId, 
      driver_id: 1, // This should come from the selected driver
      reason: "Customer declined" 
    }, {
      onSuccess: () => {
        toast.success("Ride rejected");
        // Go back to finding ride
        const reset = useRideStore.getState().reset;
        reset();
      },
      onError: (error) => {
        toast.error("Failed to reject ride");
        console.error("Reject ride error:", error);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">Loading ride details...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-[#E6E6EB] w-full max-w-[512px] h-[339px] rounded-[25px] px-[20px] py-[25px]">
        <h1 className="text-[16px] md:text-[25px] font-bold leading-[120%] tracking-[-4%] text-[#333333] mb-[16px]">
          Accepting an offer...
        </h1>
        <div className="bg-[#F5F5F7] p-[16px] mb-[24px] rounded-[8px]">
          <p className="text-[14px] text-[#02093A] leading-[140%] text-center font-normal mb-[16px]">
            {formatTime(elapsed)}
          </p>
          <div className="mb-[16px]">
            <LoadingBar />
          </div>
          
          <div className="border-b text-[#E6E6E6] border-1 mb-[16px]"></div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center bg-[#E6E6EB] h-[30px] w-[30px] rounded-full">
                <p className="text-[10px] text-[#8B8EA4] font-normal leading-[140%] p-2">
                  -5
                </p>
              </div>
              <h3 className="text-[18px] md:text-[25px] font-bold tracking-[-0.04em] leading-[120%] text-[#02093A]">
                CF {rideRequest?.id || "1024"}
              </h3>
              <div className="flex items-center justify-center bg-[#A20602] h-[30px] w-[30px] rounded-full">
                <p className="text-[10px] text-white font-normal leading-[140%] p-2">
                  +5
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-[8px] p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <Image
                src="/images/img-1.png"
                alt="Driver"
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-[#02093A]">John Driver</h3>
              <p className="text-sm text-gray-600">Toyota Camry • ABC-123</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-500">⭐</span>
                <span className="text-sm">4.8</span>
                <span className="text-gray-400">•</span>
                <span className="text-sm text-gray-600">563 rides</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            style="secondary"
            type="button"
            css="flex-1 h-[48px] rounded-[12px] text-red-600 border-red-600"
            fn={handleReject}
            disabled={rejectRide.isPending}
          >
            {rejectRide.isPending ? "Rejecting..." : "Reject"}
          </Button>
          <Button
            style="primary"
            type="button"
            css="flex-1 h-[48px] rounded-[12px]"
            fn={handleAccept}
            disabled={acceptRide.isPending}
          >
            {acceptRide.isPending ? "Accepting..." : "Accept"}
          </Button>
        </div>
      </div>
    </div>
  );
}
