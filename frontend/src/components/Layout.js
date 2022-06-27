import React from "react";
import { Outlet } from "react-router-dom";

// Components
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <main className="bg-gray-100 dark:bg-gray-800 h-screen overflow-hidden relative p-4">
      <div className="flex items-start justify-between">
        <Sidebar />
        <div className="flex flex-col w-full h-screen overflow-auto pl-0 md:px-4 md:space-y-4">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default Layout;
