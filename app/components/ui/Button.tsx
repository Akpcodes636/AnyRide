"use client";
import React from "react";
import Spinner from "./Spinner";

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
    | "tertiary"
    | "neutral"
    | "pink";
  css?: string;
  height?: string;
  rounded?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  fn,
  loading,
  disabled,
  style,
  css = "",
  height = "h-[62px]", // default height
  rounded = "rounded-[50px]", // default rounded
}) => {
  return (
    <button
      onClick={fn}
      disabled={loading || disabled}
      type={type}
      className={`
        flex items-center justify-center cursor-pointer px-4.5 text-[16px] font-semibold duration-150
        ${height} ${rounded}  /* default or overridden by css later */

        ${style === "danger" &&
          "bg-[#A20602] text-white hover:bg-[#8A0502] active:bg-[#720401] transition-colors"}
        ${style === "nobg" &&
          "border border-[#A20602] bg-white text-[#A20602] tracking-[-2%] leading-[160%] hover:bg-[#FFF5F5] active:bg-[#FFE6E6] transition-colors"}
        ${style === "primary" &&
          "bg-[#E6E6EB] border-none hover:bg-[#D6D6DB] active:bg-[#C6C6CB] transition-colors"}
        ${style === "secondary" &&
          "bg-fill-blueStrong text-text-strongInverse hover:opacity-90 active:opacity-80 transition-opacity"}
        ${style === "disabled" &&
          "bg-[#0000001A] text-text-strongInverse cursor-not-allowed"}
        ${style === "reverse" &&
          "border-[0.81px] border-stroke-strong bg-fill-weakerInverse hover:brightness-105 hover:shadow-raised transition-all duration-200 ease-in-out"}
        ${style === "reverseLight" &&
          "border-[1px] border-[#FFFFFF] text-[#FFFFFF] bg-transparent hover:bg-[#51515114] hover:shadow-raised transition-all"}
        ${style === "tertiary" &&
          "bg-[#010C4A] border border-white text-white hover:bg-[#06135F] active:bg-[#0A1A6E] transition-colors duration-200 ease-in-out"}
        ${style === "neutral" &&
          "bg-[#ba4a4a] text-[#8A8C91] transition-colors duration-200 ease-in-out !rounded-[24px]"}
        ${style === "pink" &&
          "bg-[#F6E6E6] text-[#A20602] transition-colors duration-200 ease-in-out !rounded-[24px]"}

        ${css} 
      `}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

export default Button;