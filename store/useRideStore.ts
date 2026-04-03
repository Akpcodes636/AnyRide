import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ──────────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────────
export interface Location {
  lat: number;
  lng: number;
  address?: string;
}

export interface RideRequest {
  id: string;
  customer_id: string;
  pickup: Location;
  destination: Location;
  pickup_address: string;
  destination_address: string;
  ride_type: string;
  offered_price: number;
  status: 'pending' | 'accepted' | 'confirmed' | 'rejected' | 'cancelled';
  created_at: string;
  updated_at: string;
}

export interface Ride {
  id: string;
  customer_id: string;
  driver_id?: string;
  pickup: Location;
  destination: Location;
  pickup_address: string;
  destination_address: string;
  ride_type: string;
  fare: number;
  status: 'requested' | 'accepted' | 'arrived' | 'started' | 'completed' | 'cancelled';
  driver?: {
    id: string;
    name: string;
    phone: string;
    vehicle?: {
      make: string;
      model: string;
      plate_number: string;
      color: string;
    };
  };
  created_at: string;
  updated_at: string;
  started_at?: string;
  completed_at?: string;
}

export interface FareEstimate {
  estimated_fare: number;
  distance_km: number;
  duration_minutes: number;
  ride_type: string;
}

export interface RideType {
  id: string;
  name: string;
  description: string;
  base_fare: number;
  per_km_fare: number;
  per_minute_fare: number;
  icon?: string;
}

// ──────────────────────────────────────────────────────────
// RIDE STORE STATE
// ──────────────────────────────────────────────────────────
export interface RideStoreState {
  // Customer Ride State
  pickup: Location | null;
  destination: Location | null;
  pickupAddress: string;
  destinationAddress: string;
  selectedRideType: RideType | null;
  
  // Fare Estimation
  fareEstimate: FareEstimate | null;
  isEstimatingFare: boolean;
  
  // Ride Request
  currentRequest: RideRequest | null;
  isRequestingRide: boolean;
  requestHistory: RideRequest[];
  
  // Active Ride
  activeRide: Ride | null;
  rideTracking: {
    driverLocation: Location | null;
    estimatedArrival: number | null;
    tripDuration: number | null;
  };
  
  // Driver Ride State
  availableRideRequests: RideRequest[];
  selectedRideRequest: RideRequest | null;
  isAcceptingRide: boolean;
  
  // Negotiations
  activeNegotiations: any[];
  
  // UI State
  showRideOptions: boolean;
  showFareBreakdown: boolean;
  showRideTracking: boolean;
}

export interface RideStoreActions {
  // Location Management
  setPickup: (location: Location | null, address?: string) => void;
  setDestination: (location: Location | null, address?: string) => void;
  clearLocations: () => void;
  swapLocations: () => void;
  
  // Ride Type Selection
  setSelectedRideType: (rideType: RideType | null) => void;
  
  // Fare Estimation
  estimateFare: () => void;
  setFareEstimate: (estimate: FareEstimate | null) => void;
  setEstimatingFare: (loading: boolean) => void;
  
  // Ride Request Management
  createRideRequest: () => void;
  setCurrentRequest: (request: RideRequest | null) => void;
  setIsRequestingRide: (loading: boolean) => void;
  addToRequestHistory: (request: RideRequest) => void;
  
  // Active Ride Management
  setActiveRide: (ride: Ride | null) => void;
  updateRideStatus: (status: Ride['status']) => void;
  updateDriverLocation: (location: Location) => void;
  setRideTracking: (tracking: Partial<RideStoreState['rideTracking']>) => void;
  
  // Driver Ride Management
  setAvailableRideRequests: (requests: RideRequest[]) => void;
  setSelectedRideRequest: (request: RideRequest | null) => void;
  setIsAcceptingRide: (loading: boolean) => void;
  acceptRideRequest: (requestId: string) => void;
  rejectRideRequest: (requestId: string, reason?: string) => void;
  
  // Negotiations
  addNegotiation: (negotiation: any) => void;
  removeNegotiation: (negotiationId: string) => void;
  
  // UI Controls
  setShowRideOptions: (show: boolean) => void;
  setShowFareBreakdown: (show: boolean) => void;
  setShowRideTracking: (show: boolean) => void;
  
  // Reset
  resetRideState: () => void;
}

export type RideStore = RideStoreState & RideStoreActions;

// ──────────────────────────────────────────────────────────
// INITIAL STATE
// ──────────────────────────────────────────────────────────
const initialState: RideStoreState = {
  // Customer Ride State
  pickup: null,
  destination: null,
  pickupAddress: '',
  destinationAddress: '',
  selectedRideType: null,
  
  // Fare Estimation
  fareEstimate: null,
  isEstimatingFare: false,
  
  // Ride Request
  currentRequest: null,
  isRequestingRide: false,
  requestHistory: [],
  
  // Active Ride
  activeRide: null,
  rideTracking: {
    driverLocation: null,
    estimatedArrival: null,
    tripDuration: null,
  },
  
  // Driver Ride State
  availableRideRequests: [],
  selectedRideRequest: null,
  isAcceptingRide: false,
  
  // Negotiations
  activeNegotiations: [],
  
  // UI State
  showRideOptions: false,
  showFareBreakdown: false,
  showRideTracking: false,
};

// ──────────────────────────────────────────────────────────
// STORE CREATION
// ──────────────────────────────────────────────────────────
export const useRideStore = create<RideStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Location Management
      setPickup: (location: Location | null, address?: string) => {
        set({
          pickup: location,
          pickupAddress: address || '',
        });
        
        // Clear fare estimate when locations change
        set({ fareEstimate: null });
      },
      
      setDestination: (location: Location | null, address?: string) => {
        set({
          destination: location,
          destinationAddress: address || '',
        });
        
        // Clear fare estimate when locations change
        set({ fareEstimate: null });
      },
      
      clearLocations: () => {
        set({
          pickup: null,
          destination: null,
          pickupAddress: '',
          destinationAddress: '',
          fareEstimate: null,
          selectedRideType: null,
        });
      },
      
      swapLocations: () => {
        const { pickup, destination, pickupAddress, destinationAddress } = get();
        
        set({
          pickup: destination,
          destination: pickup,
          pickupAddress: destinationAddress,
          destinationAddress: pickupAddress,
          fareEstimate: null,
        });
      },
      
      // Ride Type Selection
      setSelectedRideType: (rideType: RideType | null) => {
        set({ selectedRideType: rideType });
        
        // Re-estimate fare if locations are set
        const { pickup, destination } = get();
        if (pickup && destination && rideType) {
          get().estimateFare();
        }
      },
      
      // Fare Estimation
      estimateFare: () => {
        const { pickup, destination, selectedRideType } = get();
        
        if (!pickup || !destination || !selectedRideType) {
          return;
        }
        
        set({ isEstimatingFare: true });
        
        // This would be called by the component using the API hook
        // The hook will call setFareEstimate when complete
      },
      
      setFareEstimate: (estimate: FareEstimate | null) => {
        set({ 
          fareEstimate: estimate,
          isEstimatingFare: false,
        });
      },
      
      setEstimatingFare: (loading: boolean) => {
        set({ isEstimatingFare: loading });
      },
      
      // Ride Request Management
      createRideRequest: () => {
        const { pickup, destination, pickupAddress, destinationAddress, selectedRideType, fareEstimate } = get();
        
        if (!pickup || !destination || !selectedRideType || !fareEstimate) {
          return;
        }
        
        set({ isRequestingRide: true });
        
        // This would be called by the component using the API hook
        // The hook will call setCurrentRequest when complete
      },
      
      setCurrentRequest: (request: RideRequest | null) => {
        set({ 
          currentRequest: request,
          isRequestingRide: false,
        });
        
        if (request) {
          get().addToRequestHistory(request);
        }
      },
      
      setIsRequestingRide: (loading: boolean) => {
        set({ isRequestingRide: loading });
      },
      
      addToRequestHistory: (request: RideRequest) => {
        const { requestHistory } = get();
        set({
          requestHistory: [request, ...requestHistory.slice(0, 49)], // Keep last 50
        });
      },
      
      // Active Ride Management
      setActiveRide: (ride: Ride | null) => {
        set({ 
          activeRide: ride,
          showRideTracking: !!ride,
          currentRequest: null, // Clear request when ride becomes active
        });
        
        if (ride) {
          // Update ride tracking based on ride status
          if (ride.status === 'accepted' || ride.status === 'arrived') {
            set({ 
              rideTracking: {
                driverLocation: null, // Will be updated via real-time updates
                estimatedArrival: null,
                tripDuration: null,
              }
            });
          }
        } else {
          // Clear tracking when ride ends
          set({
            rideTracking: {
              driverLocation: null,
              estimatedArrival: null,
              tripDuration: null,
            }
          });
        }
      },
      
      updateRideStatus: (status: Ride['status']) => {
        const { activeRide } = get();
        if (activeRide) {
          set({
            activeRide: { ...activeRide, status },
          });
        }
      },
      
      updateDriverLocation: (location: Location) => {
        set({
          rideTracking: {
            ...get().rideTracking,
            driverLocation: location,
          }
        });
      },
      
      setRideTracking: (tracking: Partial<RideStoreState['rideTracking']>) => {
        set({
          rideTracking: {
            ...get().rideTracking,
            ...tracking,
          }
        });
      },
      
      // Driver Ride Management
      setAvailableRideRequests: (requests: RideRequest[]) => {
        set({ availableRideRequests: requests });
      },
      
      setSelectedRideRequest: (request: RideRequest | null) => {
        set({ selectedRideRequest: request });
      },
      
      setIsAcceptingRide: (loading: boolean) => {
        set({ isAcceptingRide: loading });
      },
      
      acceptRideRequest: (requestId: string) => {
        set({ isAcceptingRide: true });
        
        // This would be called by the component using the API hook
        // The hook will handle the success/error response
      },
      
      rejectRideRequest: (requestId: string, reason?: string) => {
        const { availableRideRequests } = get();
        
        // Remove from available requests
        set({
          availableRideRequests: availableRideRequests.filter(req => req.id !== requestId),
          selectedRideRequest: null,
        });
        
        // This would be called by the component using the API hook
      },
      
      // Negotiations
      addNegotiation: (negotiation: any) => {
        const { activeNegotiations } = get();
        set({
          activeNegotiations: [...activeNegotiations, negotiation],
        });
      },
      
      removeNegotiation: (negotiationId: string) => {
        const { activeNegotiations } = get();
        set({
          activeNegotiations: activeNegotiations.filter(n => n.id !== negotiationId),
        });
      },
      
      // UI Controls
      setShowRideOptions: (show: boolean) => {
        set({ showRideOptions: show });
      },
      
      setShowFareBreakdown: (show: boolean) => {
        set({ showFareBreakdown: show });
      },
      
      setShowRideTracking: (show: boolean) => {
        set({ showRideTracking: show });
      },
      
      // Reset
      resetRideState: () => {
        set(initialState);
      },
    }),
    {
      name: 'anyride-ride-store',
      partialize: (state) => ({
        // Only persist these fields
        pickupAddress: state.pickupAddress,
        destinationAddress: state.destinationAddress,
        selectedRideType: state.selectedRideType,
        requestHistory: state.requestHistory.slice(0, 10), // Keep last 10
      }),
    }
  )
);

// ──────────────────────────────────────────────────────────
// SELECTORS
// ──────────────────────────────────────────────────────────
export const useCanRequestRide = () => {
  const pickup = useRideStore((state) => state.pickup);
  const destination = useRideStore((state) => state.destination);
  const selectedRideType = useRideStore((state) => state.selectedRideType);
  const fareEstimate = useRideStore((state) => state.fareEstimate);
  const isRequestingRide = useRideStore((state) => state.isRequestingRide);
  const activeRide = useRideStore((state) => state.activeRide);
  
  return !!(
    pickup && 
    destination && 
    selectedRideType && 
    fareEstimate && 
    !isRequestingRide && 
    !activeRide
  );
};

export const useHasActiveRide = () => {
  const activeRide = useRideStore((state) => state.activeRide);
  return !!activeRide;
};

export const useRideProgress = () => {
  const activeRide = useRideStore((state) => state.activeRide);
  
  if (!activeRide) {
    return {
      progress: 0,
      currentStep: 'none' as const,
      steps: [],
    };
  }
  
  const steps = [
    { key: 'accepted', label: 'Driver Assigned' },
    { key: 'arrived', label: 'Driver Arrived' },
    { key: 'started', label: 'Trip Started' },
    { key: 'completed', label: 'Trip Completed' },
  ] as const;
  
  const currentIndex = steps.findIndex(step => step.key === activeRide.status);
  const progress = ((currentIndex + 1) / steps.length) * 100;
  const currentStep = currentIndex >= 0 ? steps[currentIndex] : steps[0];
  
  return {
    progress,
    currentStep,
    steps,
  };
};

export const useDriverAvailableRequests = () => {
  const availableRideRequests = useRideStore((state) => state.availableRideRequests);
  const selectedRideRequest = useRideStore((state) => state.selectedRideRequest);
  const isAcceptingRide = useRideStore((state) => state.isAcceptingRide);
  
  return {
    availableRideRequests,
    selectedRideRequest,
    isAcceptingRide,
    hasRequests: availableRideRequests.length > 0,
  };
};
