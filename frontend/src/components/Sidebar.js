import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Assets
import Logo from "../assets/icons/logo.svg";
import { userIcon, clockIcon, dashboardIcon } from "../helpers/icons";

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [pages, setPages] = useState([
    {
      name: "Dashboard",
      icon: dashboardIcon("", 17, 17),
      path: "/",
    },
    {
      name: "Users",
      icon: userIcon("", 17, 17),
      path: "/users",
    },
    {
      name: "Timezones",
      icon: clockIcon("", 17, 17),
      path: "/timezones",
    },
  ]);

  return (
    <div className="h-screen hidden rounded-2xl lg:block shadow-lg relative w-80">
      <div className="bg-white h-full rounded-2xl dark:bg-gray-700">
        <div className="flex items-center justify-center pt-6">
          <img src={Logo} alt="Timezones App" className="w-12" />
        </div>
        <nav className="mt-6">
          <div>
            {pages.map((page) => (
              <a
                key={page.name}
                className={`${
                  page.path === pathname
                    ? "text-blue-500 bg-gradient-to-r from-white to-blue-100 dark:from-gray-700 dark:to-gray-800 border-r-4 border-blue-500"
                    : "text-gray-500 dark:text-gray-200 hover:text-blue-500"
                } w-full font-thin uppercase flex items-center p-4 my-2 transition-colors duration-200 justify-start`}
                href={page.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(page.path);
                }}
              >
                <span className="text-left">{page.icon}</span>
                <span className="mx-4 text-sm font-normal">{page.name}</span>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
