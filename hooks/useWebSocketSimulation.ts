"use client";

import { useEffect, useState, useCallback } from "react";
import { useRideStore } from "@/store/rideStore";
import { useAcceptRideRequest, useRejectRideRequest } from "./useRideHooks";
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

interface SimulationEvent {
  type: "driver_viewing" | "driver_accept" | "driver_reject" | "price_increase";
  data: any;
  timestamp: number;
}

export const useWebSocketSimulation = () => {
  const rideData = useRideStore((s) => s.rideData);
  const setRideData = useRideStore((s) => s.setRideData);
  const acceptRide = useAcceptRideRequest();
  const rejectRide = useRejectRideRequest();
  
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [driversViewing, setDriversViewing] = useState<number>(0);
  const [currentDriver, setCurrentDriver] = useState<Driver | null>(null);

  // Mock drivers
  const mockDrivers: Driver[] = [
    {
      id: 1,
      name: "Jameel Abdullahi",
      car: "Xiaomi car 56",
      rating: 4.8,
      rides: 563,
      eta: "5 min",
      distance: "400m",
      image: "/images/img-1.png"
    },
    {
      id: 2,
      name: "Aisha Bello",
      car: "Toyota Corolla 12",
      rating: 4.9,
      rides: 420,
      eta: "3 min",
      distance: "350m",
      image: "/images/img-2.png"
    },
    {
      id: 3,
      name: "Mohammed Ibrahim",
      car: "Honda Civic 88",
      rating: 4.7,
      rides: 289,
      eta: "7 min",
      distance: "600m",
      image: "/images/img-3.png"
    }
  ];

  const startSimulation = useCallback(() => {
    if (!rideData.requestId) {
      console.log("No requestId, cannot start simulation");
      return;
    }

    console.log("Starting WebSocket simulation for requestId:", rideData.requestId);
    setIsSimulating(true);
    setDriversViewing(0);

    // Simulate drivers viewing the request
    const driverViewingInterval = setInterval(() => {
      setDriversViewing(prev => {
        const newCount = Math.min(prev + 1, 5);
        console.log("Drivers viewing:", newCount);
        return newCount;
      });
    }, 2000);

    // Simulate driver acceptance after 8-12 seconds
    const acceptanceTime = 8000 + Math.random() * 4000; // 8-12 seconds
    const selectedDriver = mockDrivers[Math.floor(Math.random() * mockDrivers.length)];
    
    console.log("Will accept ride in", acceptanceTime / 1000, "seconds with driver:", selectedDriver.name);

    const acceptanceTimer = setTimeout(() => {
      console.log("Simulating driver acceptance...");
      setCurrentDriver(selectedDriver);
      
      // Actually accept the ride via API
      acceptRide.mutate(rideData.requestId!, {
        onSuccess: (data) => {
          console.log("Driver accepted successfully:", data);
          toast.success(`${selectedDriver.name} accepted your ride!`);
          
          // Update ride store with driver info (using existing properties)
          setRideData({
            rideType: rideData.rideType,
            pickup: rideData.pickup,
            destination: rideData.destination,
            fareEstimate: rideData.fareEstimate,
            requestId: rideData.requestId,
            // Store driver info in a custom property if needed
          });
          
          // Stop simulation
          setIsSimulating(false);
          clearInterval(driverViewingInterval);
        },
        onError: (error) => {
          console.error("Accept ride error:", error);
          toast.error("Failed to accept ride");
        }
      });
    }, acceptanceTime);

    // Cleanup function
    return () => {
      clearInterval(driverViewingInterval);
      clearTimeout(acceptanceTimer);
      setIsSimulating(false);
    };
  }, [rideData.requestId, acceptRide, setRideData]);

  const stopSimulation = useCallback(() => {
    console.log("Stopping WebSocket simulation");
    setIsSimulating(false);
    setDriversViewing(0);
    setCurrentDriver(null);
  }, []);

  const simulateDriverRejection = useCallback(() => {
    if (!rideData.requestId || !currentDriver) return;
    
    console.log("Simulating driver rejection:", currentDriver.name);
    
    rejectRide.mutate({
      requestId: rideData.requestId,
      driver_id: currentDriver.id,
      reason: "Driver cancelled"
    }, {
      onSuccess: () => {
        toast.error(`${currentDriver.name} cancelled the ride`);
        setCurrentDriver(null);
        
        // Start looking for another driver
        setTimeout(() => {
          startSimulation();
        }, 2000);
      },
      onError: (error) => {
        console.error("Reject ride error:", error);
      }
    });
  }, [rideData.requestId, currentDriver, rejectRide, startSimulation]);

  // Auto-start simulation when we have a requestId
  useEffect(() => {
    if (rideData.requestId && !isSimulating) {
      const cleanup = startSimulation();
      return cleanup;
    }
  }, [rideData.requestId, isSimulating, startSimulation]);

  return {
    isSimulating,
    driversViewing,
    currentDriver,
    startSimulation,
    stopSimulation,
    simulateDriverRejection,
    mockDrivers
  };
};
