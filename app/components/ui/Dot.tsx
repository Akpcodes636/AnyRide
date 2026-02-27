"use client";

function Dots({ total = 3, active = 1 }) {
  return (
    <div className="flex items-center gap-[6px]">
      {Array.from({ length: total }).map((_, i) => (
        <span
          key={i}
          className={`w-[4px] h-[4px] rounded-full transition-colors ${
            i === active ? "bg-[#010C4A]" : "bg-[#E6E7ED]"
          }`}
        />
      ))}
    </div>
  );
}

export default Dots;