import React from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineDashboard, MdOutlineEngineering } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const items = [
    {
      name: "Dashboard",
      url: "/",
      icon: <MdOutlineDashboard size={20} />,
    },
    {
      name: "Users",
      url: "/users",
      icon: <FaRegUser size={20} />,
    },
    {
      name: "Engineers",
      url: "/engineers",
      icon: <MdOutlineEngineering size={20} />,
    },
  ];
  const handleClick = (url) => {
    navigate(url);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex flex-col h-[calc(100vh-32px)] w-[250px] bg-gray-100 justify-start items-center m-4 rounded-lg p-4 fixed top-0 left-0 border border-1">
      <h1 className="font-bold font-lexend text-2xl mt-4 mb-3">It Ticket</h1>
      <div className="mt-4 font-medium">
        {items.map((item, index) => (
          <div
            key={index}
            className={`w-full py-2.5 p-5 ${
              item.url == pathname
                ? "text-blue-500 border-l-4 border-l-blue-500 "
                : "bg-gray-100 border-l-4 border-l-gray-100"
            }   flex gap-2 items-center cursor-pointer `}
            onClick={() => handleClick(item.url)}
          >
            <p>{item.icon}</p>
            <p>{item.name}</p>
          </div>
        ))}
      </div> 
      <div
        className="flex justify-between mt-auto cursor-pointer"
        onClick={handleLogout}
      >
        Logout
      </div>
    </div>
  );
};

export default SideMenu;
