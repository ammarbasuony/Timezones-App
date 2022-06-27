import React from "react";

// Assets
import { angleRightIcon, angleLeftIcon } from "../helpers/icons";

const Pagination = () => {
  return (
    <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
      <div className="flex items-center">
        <button
          type="button"
          className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
        >
          {angleLeftIcon("", 9, 8)}
        </button>
        <button
          type="button"
          className="w-full px-4 py-2 border-t border-b text-base text-white bg-slate-400 hover:bg-gray-100 "
        >
          1
        </button>
        <button
          type="button"
          className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
        >
          2
        </button>
        <button
          type="button"
          className="w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100"
        >
          3
        </button>
        <button
          type="button"
          className="w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100"
        >
          4
        </button>
        <button
          type="button"
          className="w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
        >
          {angleRightIcon("", 9, 8)}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
