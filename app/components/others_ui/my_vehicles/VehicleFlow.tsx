"use client";

import React, { useState } from "react";
import MyVehiclesEmptyScreen from "./MyVehiclesEmptyScreen";
import AddNewVehicleModalStep1 from "./AddNewVehicleModalStep1";
import AddNewVehicleModalStep2 from "./AddNewVehicleModalStep2";
import VehicleUnderReviewScreen from "./VehicleUnderReviewScreen";

type VehicleStep = "empty" | "step1" | "step2" | "review";

export default function VehicleFlow() {
    const [step, setStep] = useState<VehicleStep>("empty");

    const handleAddVehicle = () => setStep("step1");
    const handleNextStep = () => setStep("step2");
    const handleSubmit = () => setStep("review");
    const handleClose = () => setStep("empty");

    if (step === "empty") {
        return <MyVehiclesEmptyScreen onAdd={handleAddVehicle} />;
    }

    if (step === "step1") {
        return (
            <AddNewVehicleModalStep1
                onNext={handleNextStep}
                onClose={handleClose}
            />
        );
    }

    if (step === "step2") {
        return (
            <AddNewVehicleModalStep2
                onNext={handleSubmit}
                onClose={handleClose}
            />
        );
    }

    if (step === "review") {
        return <VehicleUnderReviewScreen onDone={handleClose} />;
    }

    return null;
}
