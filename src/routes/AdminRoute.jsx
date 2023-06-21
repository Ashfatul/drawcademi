import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const AdminRoute = ({ children }) => {
  const { userRole, loading } = useContext(AuthContext);
  const path = useLocation();

  if (!loading) {
    if (userRole === "admin") {
      return children;
    } else {
      return <Navigate state={path?.pathname} to={`/dashboard/${userRole}`} />;
    }
  } else {
    return <Loader />;
  }
};

export default AdminRoute;
