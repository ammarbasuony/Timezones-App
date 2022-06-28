import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

// APIs
import { deleteUser } from "../../api/users";

// Actions
import { saveUsersData } from "../../store/actions";

// Assets
import { editIcon, deleteIcon } from "../../helpers/icons";

// Helpers
import { formatDate } from "../../helpers/functions";

// Components
import Modal from "../../components/Modal";

const UserItem = ({ user }) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.dataReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async () => {
    await deleteUser(user.id);
    dispatch(saveUsersData(users.filter((u) => u.id !== user.id)));
    setIsModalOpen(false);
    toast.success("User deleted successfully");
  };

  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex items-center">
            <div>
              <p className="text-gray-900 whitespace-no-wrap">{user.name}</p>
            </div>
          </div>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">{user.email}</p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          {user.role === 2 ? (
            <span className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">Admin</span>
            </span>
          ) : user.role === 1 ? (
            <span className="relative inline-block px-3 py-1 font-semibold text-purple-900 leading-tight">
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-purple-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">Manager</span>
            </span>
          ) : (
            <span className="relative inline-block px-3 py-1 font-semibold text-slate-900 leading-tight">
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-slate-200 opacity-50 rounded-full"
              ></span>
              <span className="relative">User</span>
            </span>
          )}
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {formatDate(user.createdAt)}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <p className="text-gray-900 whitespace-no-wrap">
            {formatDate(user.updatedAt)}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
          <div className="flex gap-2 justify-end">
            <Link
              to={`/users/${user.id}/edit`}
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

export default UserItem;
