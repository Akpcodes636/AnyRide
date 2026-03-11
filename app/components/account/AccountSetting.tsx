"use client";
import { User, Shield, Bell, Globe } from "lucide-react";
import { GoKey } from "react-icons/go";
import { GiGearHammer } from "react-icons/gi";
import SettingsItem from "./SettingsItem";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AccountSettings = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen pt-[100px] container mx-auto">
      <h1 className="text-[48px] font-bold text-[#333333] mb-6">
        Manage account
      </h1>

      {/* Profile Card */}
      <div className="bg-[#F5F5F7] rounded-xl py-4 px-[10px] shadow-sm mb-6 w-full max-w-[618px]">
        <div className="flex items-center gap-4">
          <Image
            src="https://i.pravatar.cc/50"
            alt="profile"
            width={500}
            height={500}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <h2 className="font-semibold text-gray-800">AbdulMalik Abdul</h2>
            <p className="text-[20px] text-[#02093A] font-normal tracking-[-5%]">
              abdul.malik@example.com
            </p>
          </div>
        </div>
      </div>

      {/* Settings List */}
      <div className="bg-[#F5F5F7] rounded-[12px] w-full max-w-[616px] divide-y divide-[#E6E6EB]">
        <SettingsItem
          icon={User}
          label="Personal info"
          onClick={() => router.push("/account/personal-info")}
        />
        <SettingsItem
          icon={GoKey}
          label="Login & Security"
          onClick={() => router.push("/account/login")}
        />
        <SettingsItem
          icon={Bell}
          label="Notifications"
          onClick={() => router.push("/account/notifications")}
        />
        <SettingsItem
          icon={Shield}
          label="Safety & Privacy"
          onClick={() => router.push("/account/safety")}
        />
        <SettingsItem
          icon={Globe}
          label="Language"
          onClick={() => router.push("/account/language")}
        />
        <SettingsItem
          icon={GiGearHammer}
          label="Terms and Conditions"
          onClick={() => router.push("/account/terms")}
        />
      </div>
    </div>
  );
};

export default AccountSettings;
