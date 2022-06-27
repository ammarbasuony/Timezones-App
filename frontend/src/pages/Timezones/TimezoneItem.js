import React from "react";

// Assets
import { editIcon, deleteIcon } from "../../helpers/icons";

const TimezoneItem = () => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div>
            <p className="text-gray-900 whitespace-no-wrap">Timezone 1</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          Cairo
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
          ></span>
          <span className="relative font-orbitron text-lg">04:00 PM</span>
        </span>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">
          2 Hours
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">12/09/2020</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">12/09/2020</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex gap-2 justify-end">
          <a
            href="/"
            className="bg-slate-500 text-white rounded-md p-2 shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          >
            {editIcon()}
          </a>
          <a
            href="/"
            className="bg-red-500 text-white rounded-md p-2 shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200"
          >
            {deleteIcon()}
          </a>
        </div>
      </td>
    </tr>
  );
};

export default TimezoneItem;
