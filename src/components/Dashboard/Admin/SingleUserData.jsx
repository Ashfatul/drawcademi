/* eslint-disable react/prop-types */
import { GrUserAdmin } from "react-icons/gr";
import { FaGraduationCap } from "react-icons/fa";
import axiosFetch from "../../../utility/axios";
import toastr from "toastr";

const SingleUserData = ({ user, refetch }) => {
   const updateUserRole = async (id, roledata) => {
      await axiosFetch.put(`/update-user-role/${id}`, { role: roledata });
      refetch();
   };

   return (
      <tr>
         <td>
            <img
               src={user?.photo}
               alt={user?.name}
               className="h-10 w-10 rounded-full object-cover object-center"
            />
         </td>
         <td>
            <p>{user?.name}</p>
         </td>
         <td>{user?.email}</td>
         <td>{user?.role}</td>
         <td>{user?.phone || "N/A"}</td>
         <td>{user?.gender || "N/A"}</td>
         <td>{user?.address || "N/A"}</td>
         <td>
            <div className="action-container flex gap-2">
               <div className="tooltip tooltip-left" data-tip="Make Admin">
                  <button
                     className="btn btn-sm btn-warning"
                     disabled={user?.role !== "student"}
                     onClick={() => {
                        updateUserRole(user?._id, "admin");
                        toastr.success("The user is now an admin.");
                     }}
                  >
                     <GrUserAdmin />
                  </button>
               </div>
               <div className="tooltip tooltip-left" data-tip="Make Instructor">
                  <button
                     className="btn btn-sm bg-sky-800 text-white hover:bg-sky-900"
                     disabled={user?.role !== "student"}
                     onClick={() => {
                        updateUserRole(user?._id, "instructor");
                        toastr.success("The user is now an instructor.");
                     }}
                  >
                     <FaGraduationCap style={{ fill: "black" }} />
                  </button>
               </div>
            </div>
         </td>
      </tr>
   );
};

export default SingleUserData;
