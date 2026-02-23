"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// This page was part of the old email-based auth flow.
// The new flow is phone-based, so redirect to login.
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-gray-500">Redirecting to login...</p>
    </div>
  );
}
