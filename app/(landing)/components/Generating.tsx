import { loading } from "@/public/assets";
import Image from "next/image";
import type { FC } from "react";

interface GeneratingProps {
  className?: string;
}

const Generating: FC<GeneratingProps> = ({ className }) => {
  return (
    <div
      className={`flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] ${
        className || ""
      } text-base`}
    >
      <Image className="w-5 h-5 mr-4" src={loading} alt="Loading" />
      Синтез программы
    </div>
  );
};

export default Generating;
