"use client";

import { useEffect, useCallback, useRef } from "react";
import { useRideStore } from "@/store/rideStore";
import { toast } from "sonner";

interface Driver {
  id: number;
  name: string;
  car: string;
  rating: number;
  rides: number;
  eta: string;
  distance: string;
  image: string;
}

type RideSocketEvent =
  | { type: "DRIVER_VIEWING"; count: number }
  | { type: "DRIVER_ACCEPTED"; driver: Driver }
  | { type: "DRIVER_REJECTED"; driverId: number };

// ✅ minimal safe type (no any)
type SocketLike = {
  disconnect: () => void;
} | null;

export const useRideSocket = () => {
  const { rideData, setRideData, next } = useRideStore();

  const socketRef = useRef<SocketLike>(null);

  const handleEvent = useCallback((event: RideSocketEvent) => {
    console.log("Socket Event:", event);

    switch (event.type) {
      case "DRIVER_VIEWING":
        setRideData({ driversViewing: event.count });
        break;

      case "DRIVER_ACCEPTED":
        setRideData({ driver: event.driver });
        toast.success(`${event.driver.name} accepted your ride`);
        next();
        break;

      case "DRIVER_REJECTED":
        toast.error("Driver rejected the ride");
        break;
    }
  }, [setRideData, next]);

  const connectSocket = useCallback(() => {
    if (!rideData.requestId) return;

    console.log("Connecting to socket for request:", rideData.requestId);

    // 🔌 real socket goes here later
  }, [rideData.requestId]);

  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      console.log("Disconnecting socket...");
      socketRef.current.disconnect();
      socketRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (!rideData.requestId) return;

    connectSocket();

    return () => {
      disconnectSocket();
    };
  }, [rideData.requestId, connectSocket, disconnectSocket]);

  return {
    connectSocket,
    disconnectSocket,
    handleEvent,
  };
};