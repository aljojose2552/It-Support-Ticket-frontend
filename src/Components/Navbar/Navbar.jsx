import React from "react";
import Avathar from "../../assets/Avathar/Avathar.jpeg";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="w-[calc(100vw-300px)] h-[70px] bg-gray-100 rounded-md sticky top-4 border border-1 flex justify-between items-center px-4 py-1">
      <div className="flex flex-col">
        <h4 className="font-semibold text-xl"> Hello Admin...</h4>
        <p className="font-light text-[12px]">Good Morning !</p>
      </div>
      <div className="w-[200px] h-full border border-1 bg-white rounded-xl flex gap-2 items-center px-2 p-1 text-sm cursor-pointer">
        <img
          src={Avathar}
          alt="avathar"
          className="w-[50px] h-[50px] rounded-full object-contain "
        />
        <div className="flex flex-col flex-1">
          <p className="font-semibold">MNZ</p>
          <p className="font-light text-[12px]">Admin</p>
        </div>
        <IoIosArrowDown size={25} />
      </div>
    </div>
  );
};

export default Navbar;
