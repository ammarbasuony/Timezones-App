import { Navigate } from "react-router-dom";
import cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const token = cookies.get("timezones_app_token");

  return token ? props.children : <Navigate to="/login" />;
};

export default ProtectedRoute;
