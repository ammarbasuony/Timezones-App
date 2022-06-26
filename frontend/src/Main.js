import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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

const Main = () => {
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
              <GuestRoute>
                <Layout />
              </GuestRoute>
            }
          >
            <Route path="users" element={<Users />} />
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default Main;
