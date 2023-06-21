import { NavLink, Outlet } from "react-router-dom";
import { BsArrowBarLeft, BsArrowBarRight } from "react-icons/bs";
import DashboardHeader from "../../DashboardHeader/DashboardHeader";
import DashboardExtraLinks from "../../DashboardHeader/DashboardExtraLinks";
import { BiAlarmAdd } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { Slide } from "react-awesome-reveal";

const InstructorLayout = () => {
   return (
      <div className="drawer lg:drawer-open">
         <input id="sideBar" type="checkbox" className="drawer-toggle" />
         <div className="drawer-content p-3 md:p-5">
            <div className="sidebar-toggle">
               <label
                  htmlFor="sideBar"
                  className="drawer-button lg:hidden  flex items-center w-fit gap-2 my-3 bg-green-50 p-2 rounded-md"
               >
                  <BsArrowBarRight className="text-xl h-10 w-10 bg-sky-800 text-white hover:bg-sky-900 p-2 rounded-full" />
                  Open Sidebar
               </label>
            </div>
            <Slide>
               <Outlet />
            </Slide>
         </div>
         <div className="drawer-side">
            <label htmlFor="sideBar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-72 h-full overflow-y-auto block bg-base-200 text-base-content">
               <DashboardHeader />
               <li>
                  {" "}
                  <div className="sidebar-toggle block">
                     <label
                        htmlFor="sideBar"
                        className="drawer-button lg:hidden flex items-center w-fit float-right gap-2 my-3 bg-green-50 p-2 rounded-md"
                     >
                        Close Sidebar
                        <BsArrowBarLeft className="text-xl h-10 w-10 bg-sky-800 text-white hover:bg-sky-900 p-2 rounded-full" />
                     </label>
                  </div>
               </li>
               <li>
                  <NavLink
                     to="/dashboard/instructor"
                     end
                     className="reset-navstyle menu-style"
                  >
                     <BiAlarmAdd /> Add a Class
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     to="/dashboard/instructor/my-classes"
                     end
                     className="reset-navstyle menu-style"
                  >
                     <FiBook /> My Classes
                  </NavLink>
               </li>
               <DashboardExtraLinks />
            </ul>
         </div>
      </div>
   );
};

export default InstructorLayout;
