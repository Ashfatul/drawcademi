import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { AuthContext } from "../../providers/AuthProvider";
import {TbLayoutGrid, TbLogout} from "react-icons/tb"

const DashboardExtraLinks = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "Are You sure to Logout?",
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        logOut().then(() => {
          navigate("/");
        });
        Swal.fire("Successfully Logged Out!", "", "success");
      }
    });
  };
  return (
    <>
      <li>
        <NavLink to="/" className="reset-navstyle menu-style">
          <TbLayoutGrid/> Frontend
        </NavLink>
      </li>
      <li>
        <button className="reset-navstyle menu-style" onClick={handleLogout}>
          <TbLogout/> Log Out
        </button>
      </li>
    </>
  );
};

export default DashboardExtraLinks;
