import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

// APIs
import { updateUser, getUser } from "../../api/users";

// Actions
import { saveUsersData } from "../../store/actions";

// Components
import Header from "../../components/Header";
import Loading from "../../components/Loading";

// Assets
import { leftArrowIcon, spinnerIcon } from "../../helpers/icons";

const UpdateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.dataReducer);
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(1);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const updatedUser = {
      name,
      email,
      role,
      password,
    };
    const response = await updateUser(id, updatedUser);
    setLoading(false);
    if (response.message) return toast.error(response.message);
    const updatedUsers = users.map((user) => {
      if (user.id === parseInt(id)) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    dispatch(saveUsersData(updatedUsers));
    toast.success("User updated successfully");
    navigate("/users");
  };

  const getUserData = async () => {
    setLoadingData(true);
    const response = await getUser(id);
    setLoadingData(false);
    if (response.message) return toast.error(response.message);
    setName(response.data.name);
    setEmail(response.data.email);
    setRole(response.data.role);
    setPassword(response.data.password);
  };

  useEffect(() => {
    getUserData();
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
              to="/users/"
              className="flex items-center justify-center gap-2 px-4 py-2 text-base font-semibold text-white bg-slate-500 rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-purple-200"
            >
              {leftArrowIcon()} Back
            </Link>
            <h2 className="text-2xl leading-tight text-slate-600 font-medium">
              Update Users
            </h2>
          </div>

          <form
            className="my-4 mb-10 shadow-md rounded-lg"
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
              <div className="max-w-sm mx-auto md:w-full md:mx-0">
                <div className="inline-flex items-center space-x-4">
                  <h1 className="text-gray-600 font-medium">
                    Update User: {name}
                  </h1>
                </div>
              </div>
            </div>
            <div className="space-y-6 bg-white rounded-lg">
              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-1/3 font-medium">
                  Personal info
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
                        type="email"
                        className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <select
                        value={role}
                        onChange={(e) => setRole(parseInt(e.target.value))}
                        className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      >
                        <option value="">Role</option>
                        <option value={2}>Admin</option>
                        <option value={1}>Manager</option>
                        <option value={0}>Regular</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="m-0" />
              <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
                <h2 className="max-w-sm mx-auto md:w-1/3 font-medium">
                  Password
                </h2>
                <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                  <div>
                    <div className="relative">
                      <input
                        type="password"
                        className="rounded-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
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
                  {loading ? spinnerIcon() : "Update User"}
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
