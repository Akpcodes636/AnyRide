"use client";

import { useState, useMemo } from "react";

type NotificationType = "ride" | "payment" | "safety";
type Tab = "all" | NotificationType;

interface Notification {
  id: number;
  type: NotificationType;
  text: string;
  time: string;
  unread: boolean;
}

interface NotificationGroup {
  label: string;
  items: Notification[];
}

const notificationGroups: NotificationGroup[] = [
  {
    label: "New",
    items: [
      { id: 1, type: "ride", text: "You've arrived at your destination. Fare: ₦3,075", time: "Just now", unread: true },
      { id: 2, type: "ride", text: "Driver John (Toyota Camry, ABC-123) has accepted your ride request.", time: "1m ago", unread: true },
    ],
  },
  {
    label: "Today",
    items: [
      { id: 3, type: "safety", text: "Emergency contact has been notified and is tracking your trip.", time: "4m ago", unread: false },
      { id: 4, type: "payment", text: "Your payment of ₦3,075 was successful (Card ***2345).", time: "4m ago", unread: false },
      { id: 5, type: "ride", text: "You've arrived at your destination. Fare: ₦3,075", time: "6m ago", unread: false },
    ],
  },
  {
    label: "Yesterday",
    items: [
      { id: 6, type: "safety", text: "Emergency contact has been notified and is tracking your trip.", time: "Yesterday", unread: false },
      { id: 7, type: "ride", text: "Driver Amaka (Honda Accord, LND-456) has accepted your ride request.", time: "Yesterday", unread: false },
      { id: 8, type: "payment", text: "Your payment of ₦2,500 was successful (Card ***2345).", time: "Yesterday", unread: false },
    ],
  },
];

function BellIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function TypeIcon({ type }: { type: NotificationType }) {
  if (type === "payment") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="4" width="22" height="16" rx="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </svg>
  );
  if (type === "safety") return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
  return <BellIcon />;
}

export default function NotificationsPage() {
  const [dismissed, setDismissed] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const dismiss = (id: number) =>
    setDismissed((prev) => new Set([...prev, id]));

  const clearAll = () =>
    setDismissed(new Set(notificationGroups.flatMap((g) => g.items.map((n) => n.id))));

  const unreadCount = useMemo(
    () => notificationGroups.flatMap((g) => g.items).filter((n) => n.unread && !dismissed.has(n.id)).length,
    [dismissed]
  );

  const filteredGroups = useMemo(
    () =>
      notificationGroups
        .map((g) => ({
          ...g,
          items: g.items.filter((n) => !dismissed.has(n.id) && (activeTab === "all" || n.type === activeTab)),
        }))
        .filter((g) => g.items.length > 0),
    [dismissed, activeTab]
  );

  return (
    <div className="min-h-screen  flex items-start justify-center container mx-auto">
      <div className="w-full max-w-full bg-white overflow-hidden">

        {/* Header */}
        <div className="pt-7">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-[#333333] tracking-[-4%] leading-[120%]">Notifications</h2>
          </div>
        </div>

        {/* Body */}
        <div className="max-h-[520px] overflow-y-auto" style={{scrollbarWidth:"none", msOverflowStyle:"none"}}>
          {filteredGroups.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-gray-400">
              <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <BellIcon className="text-gray-300" />
              </div>
              <p className="text-sm font-medium text-gray-500">You&apos;re all caught up</p>
              <p className="text-xs text-gray-400 mt-1">No notifications here</p>
            </div>
          ) : (
            filteredGroups.map((group) => (
              <div key={group.label}>
                <div className="px-6 py-2.5">
                  <span className="text-[18pxpx] font-bold tracking-[-2%] leading-[140%] text-[#353A61]">{group.label}</span>
                </div>
                {group.items.map((n) => (
                  <div
                    key={n.id}
                    className={`group flex items-start gap-3 px-6 py-4 border-b border-[#E6E6EB] transition-colors cursor-pointer relative`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mt-0.5 ${n.unread ? "bg-blue-100 text-blue-600" : "bg-[#E6E7ED] text-[#010C4A]"}`}>
                      <TypeIcon type={n.type} />
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                      <p className={`text-[18px] leading-[122%] ${n.unread ? "font-semibold text-[#02093A]" : "text-gray-600"}`}>
                        {n.text}
                      </p>
                      <span className={`text-xs mt-1 block ${n.unread ? "text-blue-500 font-medium" : "text-gray-400"}`}>
                        {n.time}
                      </span>
                    </div>
                    {n.unread && <span className="absolute right-5 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FE0000]" />}
                    {/* <button
                      onClick={(e) => { e.stopPropagation(); dismiss(n.id); }}
                      className="absolute right-4 top-3 opacity-0 group-hover:opacity-100 text-gray-300 hover:text-gray-500 text-lg leading-none transition-opacity w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100"
                    >
                      ×
                    </button> */}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}