import React from "react";
import { MdBloodtype } from "react-icons/md";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 px-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
        <MdBloodtype className="text-2xl text-red-500" />
      </div>

      <div>
        <h2 className="text-lg font-bold">LifeDrop</h2>

        <p className="text-[10px] text-gray-400">BLOOD DONATION</p>
      </div>
    </div>
  );
};

export default Logo;
