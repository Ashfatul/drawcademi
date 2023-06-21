import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toastr from "toastr";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const StudentRoute = ({ children }) => {
  const { userRole, loading } = useContext(AuthContext);
  const path = useLocation();

  if (!loading) {
    if (userRole === "student") {
      return children;
    } else {
      return <Navigate state={path?.pathname} to={`/dashboard/${userRole}`} />;
    }
  } else {
    return <Loader />;
  }
};

export default StudentRoute;
