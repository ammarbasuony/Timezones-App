import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// APIs
import { addTimezone } from "../../api/timezones";

// Actions
import { saveTimezonesData } from "../../store/actions";

// Components
import Header from "../../components/Header";

// Assets
import { leftArrowIcon, spinnerIcon } from "../../helpers/icons";

const AddTimezone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { timezones } = useSelector((state) => state.dataReducer);
  const { authData } = useSelector((state) => state.authReducer);
  const lastItem = timezones[timezones.length - 1];
  const [name, setName] = useState("");
  const [cityName, setCityName] = useState("");
  const [gmtDiff, setGmtDiff] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    const createdAt = new Date();
    const updatedAt = new Date();
    if (gmtDiff < -12 || gmtDiff > 14) return toast.error("Invalid timezone");

    e.preventDefault();
    setLoading(true);
    const timezone = {
      id: lastItem ? lastItem.id + 1 : 1,
      name,
      city_name: cityName,
      gmt_diff: parseInt(gmtDiff),
      userId: authData.id,
      user: authData,
    };
    const response = await addTimezone(timezone);
    setLoading(false);
    if (response.message) return toast.error(response.message);
    timezone.createdAt = createdAt;
    timezone.updatedAt = updatedAt;
    dispatch(saveTimezonesData([...timezones, timezone]));
    toast.success("Timezone added successfully");
    navigate("/timezones");
  };

  return (
    <div>
      <Header title="Users" />

      <div className="pb-3">
        <div className="flex flex-row mb-1 sm:mb-0 items-center gap-4 w-full">
          <Link
            to="/timezones/"
            className="flex items-center justify-center gap-2 px-4 py-2 text-base font-semibold text-white bg-slate-500 rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-purple-200"
          >
            {leftArrowIcon()} Back
          </Link>
          <h2 className="text-2xl leading-tight text-slate-600 font-medium">
            Add Timezones
          </h2>
        </div>

        <form
          className="my-4 mb-10 shadow-md rounded-lg"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
            <div className="max-w-sm mx-auto md:w-full md:mx-0">
              <div className="inline-flex items-center space-x-4">
                <h1 className="text-gray-600 font-medium">New Timezone</h1>
              </div>
            </div>
          </div>
          <div className="space-y-6 bg-white rounded-lg">
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3 font-medium">
                Main info
              </h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="City Name"
                      onChange={(e) => setCityName(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr className="m-0" />
            <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3 font-medium">
                GMT Difference
              </h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className="relative">
                    <input
                      type="number"
                      max={14}
                      min={-12}
                      className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Difference in hours"
                      onChange={(e) => setGmtDiff(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
              <button
                type="submit"
                className="py-2 px-4 h-12 bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                {loading ? spinnerIcon() : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTimezone;
