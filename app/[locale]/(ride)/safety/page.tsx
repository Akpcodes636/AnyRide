"use client";
import React from 'react';
import SafetyScreen from "@/app/components/others_ui/safety/SafetyScreen";
import Header from "@/app/components/Header";

export default function Page() {
  return (
    <>
      <Header />
      <div className="pt-[100px]">
        <SafetyScreen />
      </div>
    </>
  );
}
