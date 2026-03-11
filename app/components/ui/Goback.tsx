"use client";
import { useRouter } from "next/navigation";
import { MdOutlineKeyboardBackspace } from "react-icons/md";


export default function GoBack() {
  const router = useRouter();

  const goBack = () => {
    router.back();
  };
  return (
    <div onClick={goBack} className="cursor-pointer">
      <MdOutlineKeyboardBackspace size={32} />
    </div>
  );
}
