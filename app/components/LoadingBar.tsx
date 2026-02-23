import { useState, useEffect } from "react";

export default function LoadingBar() {
  const [progress, setProgress] = useState(0);

  // Example: simulate loading
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30); // speed of loading
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-[#FFE6E6] h-2 rounded-full overflow-hidden">
      <div
        className="h-full bg-[#A20602] transition-all duration-200"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
}