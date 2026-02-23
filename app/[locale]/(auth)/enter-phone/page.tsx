"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// This page was part of the old email-based auth flow.
// Phone entry is now handled on the /login page directly.
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
