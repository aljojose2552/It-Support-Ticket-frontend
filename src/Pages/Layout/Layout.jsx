import React from "react";
import SideMenu from "../../Components/SideMenu/SideMenu";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=" flex w-full h-full ">
      <div className="w-full h-screen flex">
        <SideMenu />
        <div className="flex-1 my-4 mr-4 rounded-lg">
          <Navbar />
          <div className="px-2 pt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
