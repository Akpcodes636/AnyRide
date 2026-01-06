"use client";

import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion"; // optional for smooth animation

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const accepted = Cookies.get("cookiesAccepted");
    if (!accepted) setShowBanner(true);
  }, []);

  const acceptCookies = () => {
    Cookies.set("cookiesAccepted", "true", { expires: 365 });
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
            <a href="/privacy" className="underline text-blue-400 hover:text-blue-500">
              Privacy Policy
            </a>.
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
