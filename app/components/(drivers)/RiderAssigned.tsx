"use client";
import { useState, useEffect } from "react";
import { useDriverStore } from "@/store/driverStore";
import { useTripModal } from "@/store/Modals";
import Image from "next/image";
import FeesBreakDownModal from "../modals/FeesBreakDownModal";
// import FeesBreakDownModal from "../modals/FeesBreakDownModal";

// ── Constants ───────────────────────────────────────────────────────────
const STATES = {
  AWAITING_RESPONSE: "AWAITING_RESPONSE",
  RIDER_ASSIGNED: "RIDER_ASSIGNED",
  NOTIFY_RIDER: "NOTIFY_RIDER",
  COUNTDOWN: "COUNTDOWN",
  START_RIDE: "START_RIDE",
  CONFIRM_PICKUP: "CONFIRM_PICKUP",
  ON_THE_WAY: "ON_THE_WAY",
} as const;

type RideState = (typeof STATES)[keyof typeof STATES];
type ProgressVariant = "dashed" | "full-blue" | "full-red" | "partial-red";

type StateConfig = {
  title: string;
  subtitle: string | null;
  progress?: ProgressVariant;
  strikePickup?: boolean;
  showRiderRow?: boolean;
  showProgress?: boolean;
  showRoute?: boolean;
  showPayment?: boolean;
  showAwaitingCard?: boolean;
  buttons: React.ReactNode;
};

// ── Sub-components ──────────────────────────────────────────────────────

const RiderRow = ({
  name,
  distance,
  eta,
}: {
  name: string;
  distance: string;
  eta: string;
}) => (
  <div className="flex items-center gap-2.5">
    <Image
      src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${name}&backgroundColor=b6e3f4`}
      alt={name}
      className="w-8 h-8 rounded-full border-2 border-blue-400 object-cover"
      width={500}
      height={500}
    />
    <span className="flex-1 text-[16px] font-normal text-[#02093A]">{name}</span>
    <span className="text-[16px] text-[#02093A] leading-[160%]">
      {distance},{" "}
      <strong className="text-[#188C3B] font-bold">{eta}</strong>
    </span>
  </div>
);

const RouteBox = ({
  pickup,
  dropoff,
  strikePickup = false,
}: {
  pickup: string;
  dropoff: string;
  strikePickup?: boolean;
}) => (
  <div className="bg-[#F5F5F7] rounded-[8px] overflow-hidden">
    <div className="flex flex-col px-3.5 py-2.5 gap-3">
      <div className="flex items-start gap-2.5">
        <div className="w-[20px] h-[20px] flex-shrink-0">
          <Image
            src="/images/Vector.webp"
            width={50}
            height={50}
            alt="map"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="border-b border-[#E6E6E6] w-full pb-2">
          <p className="text-[10px] text-[#555A7B] font-light uppercase leading-[120%]">
            Pickup
          </p>
          <p
            className={`text-[14px] font-normal ${
              strikePickup ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            {pickup}
          </p>
        </div>
      </div>
      <div className="flex items-start gap-2.5">
        <div className="w-[20px] h-[20px] flex-shrink-0">
          <Image
            src="/images/Map-Point.webp"
            width={50}
            height={50}
            alt="map"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <p className="text-[10px] text-[#555A7B] font-light uppercase leading-[120%]">
            Destination
          </p>
          <p className="text-[14px] font-normal text-[#010C4A]">{dropoff}</p>
        </div>
      </div>
    </div>
  </div>
);

const PaymentBadge = ({ type }: { type: "cash" | "inapp" }) => (
  <div className="bg-green-50 rounded-xl px-3.5 py-2 flex items-center gap-2 border border-green-100">
    <div className="w-[14px] h-[10px]">
      <Image
        src="/images/Vector (Stroke).webp"
        className="w-full h-full object-cover"
        alt="Payment"
        width={50}
        height={50}
      />
    </div>
    <span className="text-[13px] font-normal text-green-700 leading-[140%]">
      {type === "inapp" ? "In-app payment" : "Paying with Cash"}
    </span>
  </div>
);

const CallChatButtons = () => (
  <>
    <button className="h-12 w-[75px] rounded-[12px] border border-gray-200 bg-[#F5F5F7] text-[#02093A] text-[14px] font-normal flex items-center justify-center gap-1.5 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
      📞 Call
    </button>
    <button className="h-12 w-[75px] rounded-[12px] border border-gray-200 bg-[#F5F5F7] text-[#02093A] text-[14px] font-normal flex items-center justify-center gap-1.5 hover:border-blue-400 hover:text-blue-500 hover:bg-blue-50 transition-all cursor-pointer">
      💬 Chat
    </button>
  </>
);

const CarImage = () => (
  <div className="w-[93px] h-[40px] flex-shrink-0">
    <Image
      src="/images/_cars.png"
      width={500}
      height={500}
      alt="car"
      className="w-full h-full object-contain"
    />
  </div>
);

const ProgressBar = ({ variant }: { variant: ProgressVariant }) => {
  const trackClass = "flex-1 h-1.5 rounded-full relative overflow-hidden";

  if (variant === "dashed") {
    return (
      <div className="bg-[#F5F5F7] rounded-xl px-4 py-3 flex items-center gap-3">
        <CarImage />
        <div className={`${trackClass} bg-[#F6E6E6]`}>
          <div className="absolute left-0 top-0 bottom-0 w-[35%] bg-[#B40000] rounded-full animate-pulse" />
        </div>
        <span className="text-red-500 text-lg">📍</span>
      </div>
    );
  }

  const fillMap: Record<Exclude<ProgressVariant, "dashed">, string> = {
    "full-blue": "absolute inset-0 bg-blue-500 rounded-full",
    "full-red": "absolute inset-0 bg-red-500 rounded-full",
    "partial-red": "absolute left-0 top-0 bottom-0 w-[30%] bg-red-500 rounded-full",
  };

  return (
    <div className="bg-[#F5F5F7] rounded-xl px-4 py-3 flex items-center gap-3">
      <CarImage />
      <div className={`${trackClass} bg-gray-200`}>
        <div className={fillMap[variant]} />
      </div>
      <span className="text-red-500 text-lg">📍</span>
    </div>
  );
};

const AwaitingCard = ({
  rideId,
  price,
  onIncrease,
  onDecrease,
}: {
  rideId: string;
  price: number;
  onIncrease: () => void;
  onDecrease: () => void;
}) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setElapsed((e) => e + 1);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const formatTime = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const barWidth = Math.min((elapsed / 120) * 100, 100);

  return (
    <div className="bg-[#F5F5F7] p-[16px] mb-[24px] rounded-[8px]">
      <p className="text-[14px] text-[#02093A] text-center mb-[16px]">
        {formatTime(elapsed)}
      </p>
      <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#B40000] rounded-full transition-all duration-1000"
          style={{ width: `${barWidth}%` }}
        />
      </div>
      <div className="border-b border-[#E6E6E6] my-[16px]" />
      <div className="flex justify-between items-center">
        <button
          onClick={onDecrease}
          className="flex items-center justify-center bg-[#E6E6EB] h-[30px] w-[30px] rounded-full cursor-pointer hover:bg-gray-300 transition-all"
        >
          <p className="text-[10px] text-[#8B8EA4] font-normal">-5</p>
        </button>
        <div className="text-center">
          <p className="text-[12px] text-[#555A7B] font-light">Ride Price</p>
          <h3 className="text-[18px] md:text-[25px] font-bold text-[#02093A]">
            ₦{price.toLocaleString()}
          </h3>
          <p className="text-[10px] text-[#8B8EA4]">CF {rideId}</p>
        </div>
        <button
          onClick={onIncrease}
          className="flex items-center justify-center bg-[#A20602] h-[30px] w-[30px] rounded-full cursor-pointer hover:bg-red-700 transition-all"
        >
          <p className="text-[10px] text-white font-normal">+5</p>
        </button>
      </div>
    </div>
  );
};

const DriverInfoCard = ({
  name,
  distance,
  eta,
}: {
  name: string;
  distance: string;
  eta: string;
}) => (
  <div className="flex items-center gap-3 bg-[#F5F5F7] rounded-[8px] px-3.5 py-3">
    <Image
      src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${name}&backgroundColor=b6e3f4`}
      alt={name}
      className="w-10 h-10 rounded-full border-2 border-[#010C4A] object-cover flex-shrink-0"
      width={500}
      height={500}
    />
    <div className="flex-1">
      <p className="text-[14px] font-bold text-[#02093A]">{name}</p>
      <p className="text-[12px] text-[#555A7B]">Driver</p>
    </div>
    <div className="text-right">
      <p className="text-[14px] font-normal text-[#02093A]">{distance}</p>
      <p className="text-[13px] text-[#188C3B] font-bold">{eta}</p>
    </div>
  </div>
);

// ── Main component ──────────────────────────────────────────────────────
export default function RiderAssigned() {
  const { activeRequest, clearRide } = useDriverStore();
  const { modal, openModal, closeModal } = useTripModal();
  const [state, setState] = useState<RideState>(STATES.AWAITING_RESPONSE);
  const [countdown, setCountdown] = useState(299);
  const [price, setPrice] = useState(1840);

  const rider = activeRequest ?? {
    name: "Mike Brown",
    pickup: "4827 Willowbrook Lane, OH 44126",
    dropoff: "123 Main St, Springfield, IL 62704",
    distance: "1.2km",
    eta: "50 mins",
    paymentMethod: "inapp" as const,
    id: "1084",
  };

  // Countdown tick
  useEffect(() => {
    if (state !== STATES.COUNTDOWN) return;
    if (countdown <= 0) return;
    const t = setTimeout(() => {
      if (countdown - 1 <= 0) {
        setState(STATES.START_RIDE);
      } else {
        setCountdown((c) => c - 1);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [state, countdown]);

  // Auto-advance RIDER_ASSIGNED → NOTIFY_RIDER after 5s
  useEffect(() => {
    if (state !== STATES.RIDER_ASSIGNED) return;
    const t = setTimeout(() => {
      setState(STATES.NOTIFY_RIDER);
    }, 5000);
    return () => clearTimeout(t);
  }, [state]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleIncrease = () => setPrice((p) => p + 500);
  const handleDecrease = () => setPrice((p) => Math.max(0, p - 500));

  const handleEndTrip = () => {
    openModal("feesBreakdown");
  };

  const handleModalDone = () => {
    closeModal();
    clearRide();
  };

  // ── State configs ───────────────────────────────────────────────────
  const config: Record<RideState, StateConfig> = {
    [STATES.AWAITING_RESPONSE]: {
      title: "Awaiting rider's response",
      subtitle: null,
      showRiderRow: false,
      showProgress: false,
      showRoute: true,
      showPayment: true,
      showAwaitingCard: true,
      buttons: (
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={() => setState(STATES.RIDER_ASSIGNED)}
            className="h-12 rounded-[12px] bg-[#010C4A] text-white text-[14px] font-semibold flex items-center justify-center hover:bg-[#02093A] transition-all cursor-pointer"
          >
            Rider Responded
          </button>
        </div>
      ),
    },

    [STATES.RIDER_ASSIGNED]: {
      title: "Rider assigned",
      subtitle: "Be on your way to pick up the rider.",
      progress: "dashed",
      showRiderRow: false,
      showProgress: true,
      showRoute: true,
      showPayment: true,
      buttons: (
        <div className="flex items-center justify-center gap-[10px]">
          <CallChatButtons />
          <button
            disabled
            className="h-12 w-[303px] rounded-[12px] bg-gray-100 text-gray-400 text-[13px] font-semibold flex items-center justify-center cursor-not-allowed"
          >
            Notify rider
          </button>
        </div>
      ),
    },

    [STATES.NOTIFY_RIDER]: {
      title: "Notify rider you're here",
      subtitle: null,
      progress: "dashed",
      showRiderRow: true,
      showProgress: true,
      showRoute: true,
      showPayment: false,
      buttons: (
        <div className="flex items-center justify-center gap-[10px]">
          <CallChatButtons />
          <button
            onClick={() => setState(STATES.COUNTDOWN)}
            className="h-12 w-[303px] rounded-[12px] bg-[#010C4A] text-white text-[14px] font-semibold flex items-center justify-center hover:bg-gray-700 transition-all cursor-pointer"
          >
            Notify rider
          </button>
        </div>
      ),
    },

    [STATES.COUNTDOWN]: {
      title: "Start ride",
      subtitle: "You can start ride if driver refuse to show up after countdowns.",
      progress: "full-blue",
      showRiderRow: true,
      showProgress: false,
      showRoute: true,
      showPayment: false,
      buttons: (
        <div className="flex items-center justify-center gap-[10px]">
          <CallChatButtons />
          <div className="h-12 w-[303px] rounded-[12px] bg-gray-100 text-gray-600 text-[14px] font-bold flex items-center justify-center font-mono tracking-widest">
            {fmt(countdown)}
          </div>
        </div>
      ),
    },

    [STATES.START_RIDE]: {
      title: "Start ride",
      subtitle: "You can start ride if driver refuse to show up after countdowns.",
      progress: "partial-red",
      showRiderRow: true,
      showProgress: false,
      showRoute: true,
      showPayment: false,
      buttons: (
        <div className="flex items-center justify-center gap-[10px]">
          <CallChatButtons />
          <button
            onClick={() => setState(STATES.CONFIRM_PICKUP)}
            className="h-12 w-[303px] rounded-[12px] bg-[#010C4A] text-white text-[14px] font-semibold flex items-center justify-center hover:bg-gray-700 transition-all cursor-pointer"
          >
            Start ride
          </button>
        </div>
      ),
    },

    [STATES.CONFIRM_PICKUP]: {
      title: "Confirm pickup",
      subtitle: null,
      progress: "full-red",
      strikePickup: true,
      showRiderRow: true,
      showProgress: true,
      showRoute: true,
      showPayment: false,
      buttons: (
        <div className="flex items-center justify-center gap-[10px]">
          <CallChatButtons />
          <button
            onClick={() => setState(STATES.ON_THE_WAY)}
            className="w-[303px] h-[48px] rounded-[12px] bg-[#010C4A] text-white text-[14px] font-semibold flex items-center justify-center hover:bg-gray-700 transition-all cursor-pointer"
          >
            Confirm pickup
          </button>
        </div>
      ),
    },

    [STATES.ON_THE_WAY]: {
      title: "Be on your way to the destination...",
      subtitle: null,
      progress: "partial-red",
      strikePickup: true,
      showRiderRow: true,
      showProgress: false,
      showRoute: true,
      showPayment: false,
      buttons: (
        <div className="grid grid-cols-1 gap-2">
          <button
            onClick={handleEndTrip}
            className="h-12 rounded-[12px] bg-[#010C4A] text-white text-[14px] font-semibold flex items-center justify-center hover:bg-red-700 transition-all cursor-pointer"
          >
            End Trip
          </button>
        </div>
      ),
    },
  };

  const c = config[state];

  return (
    <>
      <div className="w-[512px] bg-white rounded-[25px] shadow-[0px_4px_20px_0px_#00000017] overflow-hidden">

        {/* Header */}
        <div className="px-5 pt-5">
          <h2 className="text-[25px] font-bold text-[#333333] leading-[120%] mb-[8px]">
            {c.title}
          </h2>
          {c.subtitle && (
            <p className="text-[16px] text-[#02093A] mt-0.5 leading-[160%]">
              {c.subtitle}
            </p>
          )}
        </div>

        {/* Rider row */}
        {c.showRiderRow && (
          <div className="px-5 mt-3">
            <RiderRow
              name={rider.name}
              distance={rider.distance}
              eta={rider.eta}
            />
          </div>
        )}

        {/* Driver info card — only on RIDER_ASSIGNED */}
        {state === STATES.RIDER_ASSIGNED && (
          <div className="px-5 mt-3">
            <DriverInfoCard
              name={rider.name}
              distance={rider.distance}
              eta={rider.eta}
            />
          </div>
        )}

        {/* Awaiting card */}
        {c.showAwaitingCard && (
          <div className="px-5 mt-4">
            <AwaitingCard
              rideId={(activeRequest as { id?: string })?.id ?? "1084"}
              price={price}
              onIncrease={handleIncrease}
              onDecrease={handleDecrease}
            />
          </div>
        )}

        {/* Progress */}
        {c.showProgress && c.progress && (
          <div className="px-5 mt-3">
            <ProgressBar variant={c.progress} />
          </div>
        )}

        {/* Route */}
        {c.showRoute && (
          <div className="px-5 mt-3">
            <RouteBox
              pickup={rider.pickup}
              dropoff={rider.dropoff}
              strikePickup={c.strikePickup}
            />
          </div>
        )}

        {/* Payment */}
        {c.showPayment && (
          <div className="px-5 mt-3">
            <PaymentBadge type={rider.paymentMethod} />
          </div>
        )}

        {/* Buttons */}
        <div className="px-5 mt-3 mb-5">{c.buttons}</div>
      </div>

      {/* Fees breakdown modal */}
      <FeesBreakDownModal
        isOpen={modal === "feesBreakdown"}
        onClose={handleModalDone}
        driverName={rider.name}
        driverDestination={rider.dropoff}
        totalCharged={price / 100}
        baseFare={price * 0.6 / 100}
        distanceFare={price * 0.35 / 100}
        serviceFee={price * 0.05 / 100}
        paymentMethod={rider.paymentMethod === "inapp" ? "Wallet/Card" : "Cash"}
      />
    </>
  );
}