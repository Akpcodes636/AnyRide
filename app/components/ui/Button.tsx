"use client";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type: "button" | "submit" | "reset";
  fn?: () => void;
  loading?: boolean;
  disabled?: boolean;
  style:
    | "danger"
    | "nobg"
    | "primary"
    | "reverse"
    | "reverseLight"
    | "secondary"
    | "disabled"
    | "tertiary";
  css?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  fn,
  loading,
  disabled,
  style,
  css,
}) => {
  return (
    <button
      onClick={fn}
      disabled={loading || disabled}
      type={type}
      className={`flex h-16 items-center justify-center cursor-pointer rounded-[50px] px-4.5  text-[16px] font-semibold duration-150 ${css} ${
        style === "danger" && 
        "bg-[#A20602] text-white hover:bg-[#8A0502] active:bg-[#720401] transition-colors"
      } ${
        style === "nobg" &&
        "border border-[#A20602] bg-white text-[#A20602] text-[16px] font-semibold tracking-[-2%] leading-[160%] hover:bg-[#FFF5F5] active:bg-[#FFE6E6] transition-colors"
      } ${
        style === "primary" && 
        "bg-[#E6E6EB] border-none hover:bg-[#D6D6DB] active:bg-[#C6C6CB] transition-colors"
      } ${
        style === "secondary" && 
        "bg-fill-blueStrong text-text-strongInverse hover:opacity-90 active:opacity-80 transition-opacity"
      } ${
        style === "disabled" && 
        "bg-[#0000001A] text-text-strongInverse cursor-not-allowed"
      } ${
        style === "reverse" && 
        "border-[0.81px] border-stroke-strong bg-fill-weakerInverse hover:bg-[#00000066] hover:shadow-raised transition-all"
      } ${
        style === "reverseLight" && 
        "border-[0.81px] border-stroke-strong bg-fill-weakerInverse hover:bg-[#51515114] hover:shadow-raised transition-all"
      } ${
        style === "tertiary" && 
        "bg-transparent border border-white text-white hover:bg-[#E6E6EB] active:bg-[#efeff5] transition-colors"
      }
      `}
    >
      {children}
    </button>
  );
};

export default Button;