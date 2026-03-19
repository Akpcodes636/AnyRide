"use client";
import React from 'react';
import MyRidesScreen from "@/app/components/others_ui/my_rides/MyRidesScreen";
import Header from "@/app/components/Header";

export default function Page() {
  return (
    <>
      <Header />
      <div className="pt-[100px]">
        <MyRidesScreen />
      </div>
    </>
  );
}