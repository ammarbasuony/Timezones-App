import React, { useState } from "react";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// APIs
import { login } from "../../api/auth";

// Actions
import { saveAuthData } from "../../store/actions";

// Assets
import Logo from "../../assets/icons/logo.svg";
import { envelopeIcon, lockIcon, spinnerIcon } from "../../helpers/icons";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return toast.error("Please fill all fields");
    setLoading(true);
    const loggingIn = await login(email, password);
    setLoading(false);
    if (loggingIn.message) return toast.error(loggingIn.message);
    dispatch(saveAuthData(loggingIn));
    cookies.set("timezones_app_token", loggingIn.token);
    toast.success("Login successful");
    navigate("/");
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 flex items-center justify-center h-screen">
      <div className="max-w-lg w-full">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Timezones App" className="w-16" />
        </div>
        <div className="flex flex-col px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl font-bold text-gray-600 sm:text-2xl dark:text-white">
            Login To Your Account
          </div>
          <div className="mt-8">
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="flex flex-col mb-2">
                <div className="flex relative">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    {envelopeIcon()}
                  </span>
                  <input
                    type="text"
                    className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                    {lockIcon()}
                  </span>
                  <input
                    type="password"
                    className="rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="py-2 px-4 h-12 bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                >
                  {loading ? spinnerIcon() : "Login"}
                </button>
              </div>
            </form>
          </div>
          <div className="flex items-center justify-center mt-6">
            <Link
              to="/signup"
              className="inline-flex items-center font-medium text-xs text-center text-gray-500 hover:text-gray-700 dark:text-gray-100 dark:hover:text-white"
            >
              <span className="ml-2">You don&#x27;t have an account?</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
