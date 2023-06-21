import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate } from "react-router-dom";

const LoggedInRedirect = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};

export default LoggedInRedirect;
