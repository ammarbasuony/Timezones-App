import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// APIs
import { allUsers } from "../../api/users";

// Actions
import { saveUsersData } from "../../store/actions";

// Components
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import UserItem from "./UserItem";
import Loading from "../../components/Loading";

// Assets
import { plusIcon } from "../../helpers/icons";

const Users = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.dataReducer);
  const [name, setName] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchData = async () => {
    if (!users.length) {
      const response = await allUsers();
      if (response.message) return toast.error(response.message);
      setData(response.data);
      setAllData(response.data);
      dispatch(saveUsersData(response.data));
    } else {
      setData(users);
      setAllData(users);
    }
  };

  const filterByName = (e) => {
    e.preventDefault();
    if (!name) {
      setData(allData.slice(0, 5));
      return setIsSearching(false);
    }

    const filteredData = allData.filter((user) =>
      user.name.toLowerCase().includes(name.toLowerCase())
    );
    setData(filteredData);
    setIsSearching(true);
  };

  useEffect(() => {
    fetchData();
  }, [users]);

  return (
    <div>
      <Header title="Users" />

      <div className="pb-3">
        <div className="lg:flex block flex-row mb-1 sm:mb-0 justify-between w-full">
          <Link
            to="/users/add"
            className="flex items-center justify-center gap-2 px-4 py-2 text-base font-semibold text-white bg-slate-500 rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          >
            Add User {plusIcon()}
          </Link>
          <div className="text-end">
            <form
              className="flex flex-col lg:mt-0 mt-6 md:flex-row md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center"
              onSubmit={(e) => filterByName(e)}
            >
              <div className="relative">
                <input
                  type="text"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <button
                className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-200"
                type="submit"
              >
                Filter
              </button>
            </form>
          </div>
        </div>
        {Boolean(!data?.length) && !isSearching ? (
          <div className="mt-5">
            <Loading />
          </div>
        ) : (
          <div className="pt-4 lg:mb-12 overflow-x-auto scrollbar">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    >
                      Updated at
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((user) => (
                    <UserItem key={user.id} user={user} />
                  ))}
                </tbody>
              </table>
              {(!isSearching || Boolean(data.length)) && (
                <Pagination
                  allData={allData}
                  data={data}
                  setData={setData}
                  isSearching={isSearching}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
