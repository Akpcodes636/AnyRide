"use client";
import { useState } from "react";
import { Mail, Smartphone, Bell } from "lucide-react";

type ToggleProps = {
  checked: boolean;
  onChange: () => void;
};

function Toggle({ checked, onChange }: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 ${
        checked ? "bg-green-500" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

type NotificationRow = {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
};

type NotificationSection = {
  title: string;
  rows: NotificationRow[];
};

const sections: NotificationSection[] = [
  {
    title: "Login Alerts",
    rows: [
      {
        id: "login-email",
        label: "Email",
        description: "Sent to your registered address",
        icon: <Mail className="w-4 h-4 text-gray-500" />,
      },
      {
        id: "login-sms",
        label: "SMS",
        description: "Instant text to your phone",
        icon: <Smartphone className="w-4 h-4 text-gray-500" />,
      },
    ],
  },
  {
    title: "Update Alerts",
    rows: [
      {
        id: "update-email",
        label: "Email",
        description: "Weekly digest of changes",
        icon: <Mail className="w-4 h-4 text-gray-500" />,
      },
      {
        id: "update-push",
        label: "Push Notification",
        description: "Real-time alerts on your device",
        icon: <Bell className="w-4 h-4 text-gray-500" />,
      },
    ],
  },
];

const defaultState: Record<string, boolean> = {
  "login-email": true,
  "login-sms": false,
  "update-email": false,
  "update-push": true,
};

export default function NotificationsPanel() {
  const [settings, setSettings] = useState(defaultState);

  const toggle = (id: string) =>
    setSettings((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="w-full max-w-[831px]">
      <div className="">
        {sections.map((section) => (
          <div
            key={section.title}
            className="py-4 rouded-[8px] bg-[#F5F5F7] overflow-hidden"
          >
            {/* Card Header */}
            <div className="px-5 py-2">
              <h2 className="text-sm md:text-[24px] font-semibold text-[#02093A]">
                {section.title}
              </h2>
            </div>

            {/* Rows */}
            {section.rows.map((row, index) => (
              <div
                key={row.id}
                className="flex items-center justify-between px-[16px] space-x-4  transition-colors"
              >
                <div className="flex items-center justify-between gap-3 bg-[#FFFFFF] py-2 px-2 w-full">
                  <div>
                    <p className="text-sm font-normal text-[#8B8EA4]">
                      {row.label}
                    </p>
                  </div>
                <Toggle
                  checked={settings[row.id]}
                  onChange={() => toggle(row.id)}
                />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}