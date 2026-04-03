import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ──────────────────────────────────────────────────────────
// TYPES
// ──────────────────────────────────────────────────────────
export type UserMode = 'customer' | 'driver';

export type DriverOnboardingStatus =
  | 'not_started'
  | 'profile_created'
  | 'documents_pending'
  | 'under_review'
  | 'verified'
  | 'rejected';

export interface AppState {
  // User Mode Management
  activeMode: UserMode;
  lastSelectedMode: UserMode;
  
  // User Status
  hasCustomerProfile: boolean;
  hasDriverProfile: boolean;
  driverOnboardingStatus: DriverOnboardingStatus;
  driverIsAvailable: boolean;
  
  // Active Rides
  activeCustomerRideId: string | null;
  activeDriverRideId: string | null;
  
  // UI State
  isDriverModeLocked: boolean; // Lock during active rides
  showDriverOnboardingBanner: boolean;
  
  // Location State
  currentLocation: { lat: number; lng: number } | null;
  driverLocation: { lat: number; lng: number } | null;
}

export interface AppActions {
  // Mode Switching
  setActiveMode: (mode: UserMode) => void;
  switchToCustomerMode: () => void;
  switchToDriverMode: () => void;
  
  // Profile Status
  setCustomerProfileStatus: (hasProfile: boolean) => void;
  setDriverProfileStatus: (hasProfile: boolean) => void;
  setDriverOnboardingStatus: (status: DriverOnboardingStatus) => void;
  setDriverAvailability: (isAvailable: boolean) => void;
  
  // Ride Management
  setActiveCustomerRide: (rideId: string | null) => void;
  setActiveDriverRide: (rideId: string | null) => void;
  
  // UI Controls
  setDriverModeLocked: (locked: boolean) => void;
  setShowDriverOnboardingBanner: (show: boolean) => void;
  
  // Location
  setCurrentLocation: (location: { lat: number; lng: number } | null) => void;
  setDriverLocation: (location: { lat: number; lng: number } | null) => void;
  
  // Reset
  resetAppState: () => void;
}

export type AppStore = AppState & AppActions;

// ──────────────────────────────────────────────────────────
// INITIAL STATE
// ──────────────────────────────────────────────────────────
const initialState: AppState = {
  // User Mode Management
  activeMode: 'customer',
  lastSelectedMode: 'customer',
  
  // User Status
  hasCustomerProfile: false,
  hasDriverProfile: false,
  driverOnboardingStatus: 'not_started',
  driverIsAvailable: false,
  
  // Active Rides
  activeCustomerRideId: null,
  activeDriverRideId: null,
  
  // UI State
  isDriverModeLocked: false,
  showDriverOnboardingBanner: false,
  
  // Location State
  currentLocation: null,
  driverLocation: null,
};

// ──────────────────────────────────────────────────────────
// STORE CREATION
// ──────────────────────────────────────────────────────────
export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      // Mode Switching
      setActiveMode: (mode: UserMode) => {
        const { isDriverModeLocked, activeDriverRideId, activeCustomerRideId } = get();
        
        // Prevent mode switching during active rides
        if (isDriverModeLocked) {
          console.warn('Cannot switch mode during active ride');
          return;
        }
        
        // If switching to driver mode, ensure driver is verified
        if (mode === 'driver') {
          const { hasDriverProfile, driverOnboardingStatus } = get();
          if (!hasDriverProfile || driverOnboardingStatus !== 'verified') {
            set({ showDriverOnboardingBanner: true });
            return;
          }
        }
        
        set({
          activeMode: mode,
          lastSelectedMode: mode,
        });
      },
      
      switchToCustomerMode: () => {
        const { setActiveMode, driverIsAvailable } = get();
        
        // Set driver offline before switching if they were online
        if (driverIsAvailable) {
          // TODO: Call API to set driver offline
          set({ driverIsAvailable: false });
        }
        
        setActiveMode('customer');
      },
      
      switchToDriverMode: () => {
        const { setActiveMode, hasDriverProfile, driverOnboardingStatus } = get();
        
        // Check if driver can go online
        if (!hasDriverProfile) {
          set({ showDriverOnboardingBanner: true });
          return;
        }
        
        if (driverOnboardingStatus !== 'verified') {
          set({ showDriverOnboardingBanner: true });
          return;
        }
        
        setActiveMode('driver');
      },
      
      // Profile Status
      setCustomerProfileStatus: (hasProfile: boolean) => {
        set({ hasCustomerProfile: hasProfile });
      },
      
      setDriverProfileStatus: (hasProfile: boolean) => {
        set({ hasDriverProfile: hasProfile });
      },
      
      setDriverOnboardingStatus: (status: DriverOnboardingStatus) => {
        const { showDriverOnboardingBanner } = get();
        
        set({ driverOnboardingStatus: status });
        
        // Show banner if driver is not verified
        if (status !== 'verified' && !showDriverOnboardingBanner) {
          set({ showDriverOnboardingBanner: true });
        }
        
        // Hide banner if driver is now verified
        if (status === 'verified' && showDriverOnboardingBanner) {
          set({ showDriverOnboardingBanner: false });
        }
      },
      
      setDriverAvailability: (isAvailable: boolean) => {
        set({ driverIsAvailable: isAvailable });
      },
      
      // Ride Management
      setActiveCustomerRide: (rideId: string | null) => {
        const { setActiveDriverRide, isDriverModeLocked } = get();
        
        set({ activeCustomerRideId: rideId });
        
        // Lock mode switching during active customer ride
        if (rideId && !isDriverModeLocked) {
          set({ isDriverModeLocked: true });
        } else if (!rideId && isDriverModeLocked && !get().activeDriverRideId) {
          set({ isDriverModeLocked: false });
        }
        
        // Switch to customer mode when ride starts
        if (rideId && get().activeMode === 'driver') {
          setActiveDriverRide(null); // Clear any driver ride
          set({ activeMode: 'customer' });
        }
      },
      
      setActiveDriverRide: (rideId: string | null) => {
        const { setActiveCustomerRide, isDriverModeLocked } = get();
        
        set({ activeDriverRideId: rideId });
        
        // Lock mode switching during active driver ride
        if (rideId && !isDriverModeLocked) {
          set({ isDriverModeLocked: true });
        } else if (!rideId && isDriverModeLocked && !get().activeCustomerRideId) {
          set({ isDriverModeLocked: false });
        }
        
        // Switch to driver mode when ride starts
        if (rideId && get().activeMode === 'customer') {
          setActiveCustomerRide(null); // Clear any customer ride
          set({ activeMode: 'driver' });
        }
      },
      
      // UI Controls
      setDriverModeLocked: (locked: boolean) => {
        set({ isDriverModeLocked: locked });
      },
      
      setShowDriverOnboardingBanner: (show: boolean) => {
        set({ showDriverOnboardingBanner: show });
      },
      
      // Location
      setCurrentLocation: (location: { lat: number; lng: number } | null) => {
        set({ currentLocation: location });
      },
      
      setDriverLocation: (location: { lat: number; lng: number } | null) => {
        set({ driverLocation: location });
      },
      
      // Reset
      resetAppState: () => {
        set(initialState);
      },
    }),
    {
      name: 'anyride-app-store',
      partialize: (state) => ({
        // Only persist these fields
        activeMode: state.activeMode,
        lastSelectedMode: state.lastSelectedMode,
        hasCustomerProfile: state.hasCustomerProfile,
        hasDriverProfile: state.hasDriverProfile,
        driverOnboardingStatus: state.driverOnboardingStatus,
        driverIsAvailable: state.driverIsAvailable,
        showDriverOnboardingBanner: state.showDriverOnboardingBanner,
      }),
    }
  )
);

// ──────────────────────────────────────────────────────────
// SELECTORS
// ──────────────────────────────────────────────────────────
export const useCustomerMode = () => {
  const activeMode = useAppStore((state) => state.activeMode);
  return activeMode === 'customer';
};

export const useDriverMode = () => {
  const activeMode = useAppStore((state) => state.activeMode);
  return activeMode === 'driver';
};

export const useCanSwitchModes = () => {
  const isDriverModeLocked = useAppStore((state) => state.isDriverModeLocked);
  return !isDriverModeLocked;
};

export const useHasActiveRide = () => {
  const activeCustomerRideId = useAppStore((state) => state.activeCustomerRideId);
  const activeDriverRideId = useAppStore((state) => state.activeDriverRideId);
  return !!(activeCustomerRideId || activeDriverRideId);
};

export const useDriverCanGoOnline = () => {
  const hasDriverProfile = useAppStore((state) => state.hasDriverProfile);
  const driverOnboardingStatus = useAppStore((state) => state.driverOnboardingStatus);
  const activeDriverRideId = useAppStore((state) => state.activeDriverRideId);
  
  return hasDriverProfile && 
         driverOnboardingStatus === 'verified' && 
         !activeDriverRideId;
};

export const useShowDriverOnboarding = () => {
  const showDriverOnboardingBanner = useAppStore((state) => state.showDriverOnboardingBanner);
  const hasDriverProfile = useAppStore((state) => state.hasDriverProfile);
  const driverOnboardingStatus = useAppStore((state) => state.driverOnboardingStatus);
  
  return showDriverOnboardingBanner || 
         (!hasDriverProfile || driverOnboardingStatus !== 'verified');
};

// ──────────────────────────────────────────────────────────
// UTILITY HOOKS
// ──────────────────────────────────────────────────────────
export const useModeSwitcher = () => {
  const activeMode = useAppStore((state) => state.activeMode);
  const switchToCustomerMode = useAppStore((state) => state.switchToCustomerMode);
  const switchToDriverMode = useAppStore((state) => state.switchToDriverMode);
  const canSwitchModes = useCanSwitchModes();
  
  return {
    activeMode,
    switchToCustomerMode,
    switchToDriverMode,
    canSwitchModes,
    isCustomerMode: activeMode === 'customer',
    isDriverMode: activeMode === 'driver',
  };
};

export const useDriverStatus = () => {
  const hasDriverProfile = useAppStore((state) => state.hasDriverProfile);
  const driverOnboardingStatus = useAppStore((state) => state.driverOnboardingStatus);
  const driverIsAvailable = useAppStore((state) => state.driverIsAvailable);
  const setDriverAvailability = useAppStore((state) => state.setDriverAvailability);
  const canGoOnline = useDriverCanGoOnline();
  
  return {
    hasDriverProfile,
    driverOnboardingStatus,
    driverIsAvailable,
    setDriverAvailability,
    canGoOnline,
    isVerified: driverOnboardingStatus === 'verified',
    needsVerification: hasDriverProfile && driverOnboardingStatus !== 'verified',
    notStarted: driverOnboardingStatus === 'not_started',
  };
};
