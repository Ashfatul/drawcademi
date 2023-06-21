import { Link, NavLink, useNavigate } from "react-router-dom";
import ThemeToggler from "../../ThemeToggler/ThemeToggler";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";
import Headroom from "react-headroom";
import axiosFetch from "../../../utility/axios";

const Header = () => {
   const { user, logOut, userRole } = useContext(AuthContext);
   const [userData, setUserData] = useState({});

   useEffect(() => {
      axiosFetch.get(`/user/${user?.uid}`).then((res) => setUserData(res.data));
   }, [user]);
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

   const menuItem = (
      <>
         <li>
            <NavLink to="/" className="reset-navstyle menu-style">
               Home
            </NavLink>
         </li>
         <li>
            <NavLink to="/instructors" className="reset-navstyle menu-style">
               Instructors
            </NavLink>
         </li>
         <li>
            <NavLink to="/classes" className="reset-navstyle menu-style">
               Classes
            </NavLink>
         </li>
         {user && userRole && (
            <li>
               <NavLink
                  to={`/dashboard/${userRole}`}
                  className="reset-navstyle menu-style"
               >
                  Dashboard
               </NavLink>
            </li>
         )}
         <div className="mx-5 flex items-center mt-5 lg:mt-0">
            <ThemeToggler />
         </div>
      </>
   );
   return (
      <Headroom>
         <div className="bg-[#075985]">
            <div className="container">
               <header>
                  <div className="navbar p-0 flex justify-between">
                     <div className="">
                        <div className="lg:hidden">
                           <div className="dropdown">
                              <label
                                 tabIndex={0}
                                 className="btn btn-ghost lg:hidden"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                 >
                                    <path
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                       strokeWidth="2"
                                       d="M4 6h16M4 12h8m-8 6h16"
                                    />
                                 </svg>
                              </label>
                              <ul
                                 tabIndex={0}
                                 className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                              >
                                 {menuItem}
                              </ul>
                           </div>
                        </div>
                        <Link className="normal-case text-2xl font-bold text-white">
                           DrawCademi
                        </Link>
                     </div>

                     <div className="">
                        <div className="hidden lg:flex">
                           <ul className="text-white menu menu-horizontal px-1 py-0">
                              {menuItem}
                           </ul>
                        </div>
                        {user ? (
                           <div className="dropdown dropdown-hover dropdown-end">
                              <div className="ml-4 w-10 h-10 rounded-full bg-green-200 overflow-hidden cursor-pointer">
                                 <Link to="/profile">
                                    <img
                                       src={userData.photo}
                                       alt="profile image"
                                       className="w-full h-full object-cover object-center"
                                       tabIndex={0}
                                    />
                                 </Link>
                              </div>
                              <ul
                                 tabIndex={0}
                                 className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
                              >
                                 <p className="text-center">
                                    Hello There, <br />{" "}
                                    <span className="text-lg">
                                       {userData?.name}
                                    </span>
                                 </p>
                                 <p className="text-center mt-5">
                                    Role:{" "}
                                    <span className="text-sky-500">
                                       {userData?.role}
                                    </span>
                                 </p>
                                 <div className="divider my-2"></div>
                                 <li>
                                    <NavLink
                                       to="/profile"
                                       className="text-lg reset-navstyle"
                                    >
                                       View Profile
                                    </NavLink>
                                 </li>
                                 <li>
                                    <button
                                       onClick={handleLogout}
                                       className="text-lg"
                                    >
                                       Logout
                                    </button>
                                 </li>
                              </ul>
                           </div>
                        ) : (
                           <Link className="text-lg btn" to="/login">
                              Login
                           </Link>
                        )}
                     </div>
                  </div>
               </header>
            </div>
         </div>
      </Headroom>
   );
};

export default Header;
