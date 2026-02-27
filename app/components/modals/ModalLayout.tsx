import { X } from "lucide-react";
import React, { useEffect } from "react";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const ModalLayout: React.FC<ModalLayoutProps> = ({
  isOpen,
  onClose,
  children,
  className,
}) => {
  // Disable scrolling on the background when the  is oLayoutpen
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 ">
      {/* Overlay */}
      <div
        className="absolute inset-0 h-[100vh] bg-[#0909097f] overflow-hidden"
        onClick={onClose}
      ></div>

      {/*  CardLayout */}
      <div className={`${className} z-10 w-full rounded-lg bg-white`}>
        <div className="flex items-center justify-end gap-4 p-5">
          {/* Close Icon */}
          <button
            className="text-gray-500 hover:text-gray-800 bg-black rounded-full h-[40px] w-[40px] flex items-center justify-center"
            onClick={onClose}
          >
            <X className="size-4 text-white" />
          </button>
        </div>

        {/* Card Content */}
        {/* <div className="">{children}</div> */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)] overscroll-contain scrollbar-hide">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalLayout;
