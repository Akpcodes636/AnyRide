"use client";
import React from 'react';
import SavedRidesScreen from "@/app/components/others_ui/saved_ride/SavedRidesScreen";
import Header from "@/app/components/Header";

export default function Page() {
  return (
    <>
      <Header />
      <div className="pt-[100px]">
        <SavedRidesScreen />
      </div>
    </>
  );
}