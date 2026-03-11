"use client";
import Header from "@/app/components/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* CONSTANT HEADER */}
      <Header />

      {/* AUTH CONTENT */}
      <div className="flex flex-1 items-stretch">
        {/* RIGHT CONTENT */}
        <div className="flex flex-1 overflow-auto">
          <section className="w-full pt-8 container mx-auto">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
}
