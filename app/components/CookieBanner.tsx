"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion"; // optional for smooth animation
import Link from "next/link";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(() => {
  if (typeof window === "undefined") return false;
  return !Cookies.get("cookiesAccepted");
});


  const acceptCookies = () => {
    Cookies.set("cookiesAccepted", "true", { expires: 30 });
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:left-1/4 md:right-1/4 bg-gray-900 text-white p-4 md:p-6 flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0 md:space-x-4 rounded-xl shadow-lg z-50"
        >
          <p className="text-sm md:text-base text-center md:text-left">
            We use cookies to improve your experience. By using our site, you agree to our{" "}
            <Link href="/privacy" className="underline text-blue-400 hover:text-blue-500">
              Privacy Policy
            </Link>
          </p>
          <button
            onClick={acceptCookies}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition font-medium"
          >
            Accept
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
