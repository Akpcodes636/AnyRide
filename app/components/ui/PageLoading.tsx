// import Image from "next/image";
import { ImSpinner3 } from "react-icons/im";

export default function PageLoading() {
  return (
    <div className="absolute bottom-0 left-0 right-0 top-0 z-40 flex items-center justify-center bg-white">
      {/* <Image
        src="/loader.gif"
        height={500}
        width={500}
        alt="loader"
        className="object-contain"
        unoptimized
      /> */}
      <ImSpinner3 size={72} className="animate-spin mt-20" />
    </div>
  );
}
