"use client";
import React, { FC } from "react";

interface SubTitleProps {
  text: string;
  css?: string;
  img?:string;
  bg?: string;
}

const SubTitle: FC<SubTitleProps> = ({ text, css = "", img, bg = "bg-[#FFE6E6]"}) => {
  return (
    <div
      className={`
        flex items-center gap-2
        w-fit h-8.5
        px-3 py-1
        rounded-full
        ${bg}
       
        ${css}
      `}
    >
      {img && (
        <span className="w-4 h-4 shrink-0">
          <img
            src={img}
            width={16}
            height={16}
            className="w-full h-full object-contain"
            alt="icons"
          />
        </span>
      )}

      <h5 className="text-[14px] leading-[160%] tracking-[-2%] text-[#6B0000]">
        {text}
      </h5>
    </div>
  );
};

export default SubTitle;
