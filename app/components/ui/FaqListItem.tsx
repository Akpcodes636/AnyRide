"use client";
import React, { FC, useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { LuPlus } from "react-icons/lu";
import { FaMinus } from "react-icons/fa";

interface IProps {
  question: string;
  answer: string;
}

const FaqListItem: FC<IProps> = ({ question, answer }) => {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        // Open animation
        gsap.fromTo(
          contentRef.current,
          { height: 0, opacity: 0 },
          {
            height: "auto",
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            overflow: "hidden",
          }
        );
      } else {
        // Close animation
        gsap.fromTo(
          contentRef.current,
          { height: contentRef.current.scrollHeight, opacity: 1 },
          {
            height: 0,
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
            overflow: "hidden",
          }
        );
      }
    }
  }, [open]);

  return (
    <div
      onClick={() => setOpen(!open)}
      className={`cursor-pointer rounded-xl px-4 py-5 transition-colors duration-300 bg-[#F5F5F7] mb-[16px] ${
        open ? "bg-icon-strong-inverse" : "bg-fill-weaker"
      }`}
    >
      <div className="flex items-center justify-between">
        <h4 className="text-title-sm font-bold text-text-strong xs:text-title-md">
          {question}
        </h4>
        
        {/* Fixed Icon Button */}
        <div className="flex items-center justify-center w-8 h-8 rounded-full border border-[#DCDCDC] hover:bg-gray-50 transition-colors duration-200 flex-shrink-0">
          {!open ? (
            <LuPlus 
              size={20}
              className="text-[#A20602] transition-transform duration-500"
              strokeWidth={2.5}
            />
          ) : (
            <FaMinus  
              size={16}
              className="text-[#A20602] transition-transform duration-500"
            />
          )}
        </div>
      </div>

      <div ref={contentRef} className="overflow-hidden" style={{ height: 0 }}>
        <div className="mt-3">
          <p className="text-paragraph-md leading-6">{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default FaqListItem;