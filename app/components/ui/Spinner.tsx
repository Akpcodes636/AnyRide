"use client";


import { Loader } from "lucide-react";

const Spinner = () => {
  return (
    <div>
      <Loader className="animate-spin" size={24} />
    </div>
  );
};

export default Spinner;
