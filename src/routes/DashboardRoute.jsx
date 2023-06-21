import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const DashboardRoute = () => {
  const { user, userRole } = useContext(AuthContext);
  if (user && userRole) {
    return <Navigate to={`/dashboard/${userRole}`} />;
  } else if (!user) {
    return <Navigate to={`/login`} />;
  }
};

export default DashboardRoute;
