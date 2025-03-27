import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const items = [
    {
      name: "Dashboard",
      url: "/",
    },
    {
      name: "Users",
      url: "/users",
    },
    {
      name: "Engineers",
      url: "/engineers",
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
    <div className="flex flex-col h-[calc(100vh-32px)] w-[200px] bg-gray-100 justify-start items-center m-4 rounded-lg p-4">
      <h1 className="font-bold font-lexend text-2xl mt-4 mb-3">It Ticket</h1>
      <div className="mt-4 font-medium">
        {items.map((item, index) => (
          <div
            key={index}
            className={`w-full py-2 p-5 ${
              item.url == pathname
                ? "text-blue-500 border border-l-blue-500 "
                : "bg-gray-100 "
            }   flex gap-2 items-center cursor-pointer `}
            onClick={() => handleClick(item.url)}
          >
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
