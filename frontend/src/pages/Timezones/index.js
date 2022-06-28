import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

// APIs
import { allTimezones, getTimezoneByUser } from "../../api/timezones";

// Actions
import { saveTimezonesData } from "../../store/actions";

// Components
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import TimezoneItem from "./TimezoneItem";
import Loading from "../../components/Loading";

// Assets
import { plusIcon } from "../../helpers/icons";

const Timezones = () => {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const dispatch = useDispatch();
  const { timezones } = useSelector((state) => state.dataReducer);
  const {
    authData: { id, role },
  } = useSelector((state) => state.authReducer);
  const [name, setName] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [noData, setNoData] = useState(false);

  const fetchData = async () => {
    if (!timezones.length && !noData) {
      const response =
        role === 2 ? await allTimezones() : await getTimezoneByUser(id);
      if (response.message) return toast.error(response.message);
      setData(response.data);
      setAllData(response.data);
      dispatch(saveTimezonesData(response.data));
      if (!response.data.length) setNoData(true);
    } else {
      setData(timezones.slice(0, 5));
      setAllData(timezones);
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
  }, [timezones, id]);

  return (
    <div>
      <Header title="Timezones" />

      <div className="pb-3">
        <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
          <Link
            to="/timezones/add"
            className="flex items-center gap-2 px-4 py-2 text-base font-semibold text-white bg-slate-500 rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          >
            Add Timezone {plusIcon()}
          </Link>
          <div className="text-end">
            <form
              className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center"
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
        {Boolean(!data?.length) && !isSearching && !noData ? (
          <div className="mt-5">
            <Loading />
          </div>
        ) : (
          <div className="pt-4 overflow-x-auto scrollbar">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    >
                      City Name
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    >
                      Timezone's Time
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    >
                      Difference between browser’s time
                    </th>
                    {data[0]?.user ? (
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                      >
                        Created By
                      </th>
                    ) : (
                      ""
                    )}
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    >
                      Updated at
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium"
                    ></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item) => (
                    <TimezoneItem key={item.id} item={item} />
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

export default Timezones;
