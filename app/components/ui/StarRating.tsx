import { useState } from "react";
import { AiFillStar } from "react-icons/ai"; // from react-icons

export default function StarRating() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <AiFillStar
          key={star}
          size={48} // sets width & height
          className={`cursor-pointer transition-colors duration-200 ${
            hovered && star <= hovered ? "text-yellow-400" : "text-[#F5F5F7]"
          }`}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(null)}
        />
      ))}
    </div>
  );
}