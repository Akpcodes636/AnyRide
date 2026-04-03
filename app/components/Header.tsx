"use client";

import MobileNav from "./nav/MobileNav";
import Navbar from "./nav/Navbar";
import { NavigationItem } from "@/types";

interface HeaderProps {
  title?: string;
  isDriver?: boolean;
  isRider?: boolean;
}

const Header: React.FC<HeaderProps> = () => {
  const isDriverRoute = false; // This would be determined by auth context or route
  const isRiderRoute = false; // This would be determined by auth context or route

  // Driver-specific navigation items
  const driverNavItems: NavigationItem[] = isDriverRoute ? [
    { href: "/drivers/verifications", icon: null, label: "Verifications" },
    { href: "/drivers/main/drive-and-earn", icon: null, label: "Drive & Earn" },
    { href: "/drivers/main/my-vehicles", icon: null, label: "My Vehicles" },
    { href: "/notifications", icon: null, label: "Notifications" },
    { href: "/about", icon: null, label: "About" },
  ] : [];

  const navItems: NavigationItem[] = isDriverRoute ? driverNavItems : [
    { href: "/services/rider", icon: null, label: "Book a ride" },
    { href: "/fleet", icon: null, label: "Fleet" },
    { href: "/partners", icon: null, label: "Partners" },
    { href: "/contact", icon: null, label: "Contact Us" },
  ];

  return (
    <header className="bg-white h-[90px] w-full fixed left-0 right-0 top-0 z-50 shadow-xs">
      <div className="">
        <MobileNav />
        <Navbar />
      </div>
    </header>
  )
}

export default Header;