import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import cookies from "js-cookie";

// Actions
import { saveAuthData } from "./store/actions";

// API
import { getUserfromToken } from "./api/auth";

// Helpers
import GuestRoute from "./helpers/routes/GuestRoute";
import ProtectedRoute from "./helpers/routes/ProtectedRoute";

// Layout
import Layout from "./components/Layout";

// Pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";

import Users from "./pages/Users";
import AddUser from "./pages/Users/AddUser";
import UpdateUser from "./pages/Users/UpdateUser";

import Timezones from "./pages/Timezones";
import AddTimezone from "./pages/Timezones/AddTimezone";
import UpdateTimezone from "./pages/Timezones/UpdateTimezone";

const Main = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer);
  const appToken = cookies.get("timezones_app_token");

  const getUser = async () => {
    const user = await getUserfromToken(appToken);
    user.token = appToken;
    dispatch(saveAuthData(user));
  };

  useEffect(() => {
    if (appToken) {
      getUser();
    }
  }, []);

  return (
    <div className="Timezones-App">
      <Router>
        <Routes>
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <SignUp />
              </GuestRoute>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="users">
              <Route path="add" element={<AddUser />} />
              <Route path=":id/edit" element={<UpdateUser />} />
              <Route index element={<Users />} />
            </Route>
            <Route path="timezones">
              <Route path="add" element={<AddTimezone />} />
              <Route path=":id/edit" element={<UpdateTimezone />} />
              <Route index element={<Timezones />} />
            </Route>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
