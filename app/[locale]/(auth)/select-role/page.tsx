"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Role selection is now handled during the login flow via the Login form.
// This page is no longer needed, redirect to login.
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
