import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import toastr from "toastr";
import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/Loader/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const path = useLocation();

  if (!loading) {
    if (user) {
      return children;
    } else {
      toastr.error("You must login First");
      return <Navigate state={path.pathname} to="/login" />;
    }
  } else {
    return <Loader />;
  }
};

export default PrivateRoute;
