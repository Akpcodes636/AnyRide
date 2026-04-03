"use client";
import Header from "@/app/components/Header";
import ManageAccountScreen from "@/app/components/others_ui/manage_account/ManageAccountScreen";

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto py-10 pt-32 lowercase">
        <Header />
        <ManageAccountScreen />
      </main>
    </div>
  );
}
