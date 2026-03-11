// import Image from "next/image";
import { ImSpinner3 } from "react-icons/im";

export default function PageLoading() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-white">
      <ImSpinner3 size={72} className="animate-spin mt-20" />
    </div>
  );
}
