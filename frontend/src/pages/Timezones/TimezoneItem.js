import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// APIs
import { deleteTimezone } from "../../api/timezones";

// Actions
import { saveTimezonesData } from "../../store/actions";

// Assets
import { editIcon, deleteIcon } from "../../helpers/icons";

// Helpers
import { formatDate, getTime, getDifference } from "../../helpers/functions";

// Components
import Modal from "../../components/Modal";

const TimezoneItem = ({ item }) => {
  const dispatch = useDispatch();
  const { timezones } = useSelector((state) => state.dataReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    await deleteTimezone(item.id);
    dispatch(saveTimezonesData(timezones.filter((t) => t.id !== item.id)));
    setIsModalOpen(false);
    toast.success("Timezone deleted successfully");
  };

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div>
              <p className="text-gray-900 whitespace-no-wrap">{item.name}</p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{item.city_name}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <span className="relative inline-block px-3 py-1 font-semibold text-gray-900 leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-yellow-200 opacity-50 rounded-full"
            ></span>
            <span className="relative font-orbitron text-lg">
              {getTime(item.gmt_diff)}
            </span>
          </span>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {getDifference(item.gmt_diff)} Hours
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {formatDate(item.createdAt)}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {formatDate(item.updatedAt)}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex gap-2 justify-end">
            <Link
              to={`/timezones/${item.id}/edit`}
              className="bg-slate-500 text-white rounded-md p-2 shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            >
              {editIcon()}
            </Link>
            <a
              href="/"
              className="bg-red-500 text-white rounded-md p-2 shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-200"
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
            >
              {deleteIcon()}
            </a>
          </div>
        </td>
      </tr>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onDelete={() => handleDelete()}
      />
    </>
  );
};

export default TimezoneItem;
