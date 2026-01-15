import { useState, useEffect } from "react";
import dayjs from "dayjs"; // optional for easy formatting

const RideETA = ({ estimated_duration_minutes }: { estimated_duration_minutes: number }) => {
  const [timeLeft, setTimeLeft] = useState(estimated_duration_minutes);
  const [arrivalTime, setArrivalTime] = useState("");

  useEffect(() => {
    // Calculate arrival time based on now + timeLeft
    const updateArrival = () => {
      const arrival = dayjs().add(timeLeft, "minute").format("h:mm A");
      setArrivalTime(arrival);
    };

    updateArrival(); // initial

    // Update every minute
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) return 0;
        return prev - 1;
      });
      updateArrival();
    }, 60000); // 60,000 ms = 1 min

    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
   <p className="text-xs text-gray-500 mt-1">
  {timeLeft} mins away &bull; {arrivalTime}
</p>
  );
};

export default RideETA;