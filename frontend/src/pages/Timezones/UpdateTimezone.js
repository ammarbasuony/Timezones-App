import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// APIs
import { updateTimezone, getTimezone } from "../../api/timezones";

// Actions
import { saveTimezonesData } from "../../store/actions";

// Components
import Header from "../../components/Header";
import Loading from "../../components/Loading";

// Assets
import { leftArrowIcon, spinnerIcon } from "../../helpers/icons";

const UpdateTimezone = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { timezones } = useSelector((state) => state.dataReducer);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [cityName, setCityName] = useState("");
  const [gmtDiff, setGmtDiff] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedTimezone = {
      name,
      city_name: cityName,
      gmt_diff: parseInt(gmtDiff),
    };
    const response = await updateTimezone(id, updatedTimezone);
    setLoading(false);
    if (response.message) return toast.error(response.message);
    const updatedTimezones = timezones.map((timezone) => {
      if (timezone.id === parseInt(id)) {
        return { ...timezone, ...updatedTimezone };
      }
      return timezone;
    });
    dispatch(saveTimezonesData(updatedTimezones));
    toast.success("Timezone updated successfully");
    navigate("/timezones");
  };

  const getTimezoneData = async () => {
    setLoadingData(true);
    const response = await getTimezone(id);
    setLoadingData(false);
    if (response.message) return toast.error(response.message);
    setName(response.data.name);
    setCityName(response.data.city_name);
    setGmtDiff(response.data.gmt_diff);
  };

  useEffect(() => {
    getTimezoneData();
  }, [id]);

  return (
    <div>
      <Header title="Users" />

      {loadingData ? (
        <Loading />
      ) : (
        <div className="pb-3">
          <div className="flex flex-row mb-1 sm:mb-0 items-center gap-4 w-full">
            <Link
              to="/timezones/"
              className="flex items-center justify-center gap-2 px-4 py-2 text-base font-semibold text-white bg-slate-500 rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            >
              {leftArrowIcon()} Back
            </Link>
            <h2 className="text-2xl leading-tight text-slate-600 font-medium">
              Update Timezones
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
                        value={name}
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
                        value={cityName}
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
                        className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Difference in hours"
                        onChange={(e) => setGmtDiff(e.target.value)}
                        value={gmtDiff}
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
      )}
    </div>
  );
};

export default UpdateTimezone;
