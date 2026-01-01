"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/en"); // Redirect to default locale
  }, [router]);

  return null; // Still a React component
}
