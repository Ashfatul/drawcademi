import { FaMoneyBill, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import axiosFetch from "../../../utility/axios";
import { useState } from "react";
import Loader from "../../Loader/Loader";

/* eslint-disable react/prop-types */
const SingleSelectedClass = ({ classItem, refetch }) => {
   const [loading, setLoading] = useState(false);
   const handleDelete = () => {
      Swal.fire({
         title: "Are you sure to delete?",
         showCancelButton: true,
         confirmButtonText: "Delete",
      }).then((result) => {
         if (result.isConfirmed) {
            setLoading(true);
            axiosFetch
               .delete(`/student-classes/delete/${classItem?._id}`)
               .then(refetch());
            Swal.fire("Deleted!", "", "success");
            setLoading(false);
         } else {
            setLoading(false);
         }
      });
   };
   return (
      <>
         {loading ? (
            <Loader />
         ) : (
            <tr>
               <td>
                  <img
                     src={classItem?.classItem?.classImage}
                     alt={classItem?.classItem?.classTitle}
                     className="h-12 w-12"
                  />
               </td>
               <td>
                  <h2 className="text-xl">
                     {classItem?.classItem?.classTitle}
                  </h2>
                  <p>{classItem?.classItem?.instructorName}</p>
                  <p>{classItem?.classItem?.instructorEmail}</p>
                  <p>
                     Price:{" "}
                     <span className="text-sky-500">
                        ${classItem?.classItem?.price}
                     </span>
                  </p>
               </td>
               <td>
                  <p>
                     Available Seats:{" "}
                     <span className="text-sky-500">
                        {classItem?.classItem?.availableSeats}
                     </span>
                  </p>
               </td>
               <td>
                  <div className="action-btns flex gap-2">
                     <div
                        className="tooltip tooltip-left"
                        data-tip="Delete Selected Class"
                     >
                        <button
                           className="btn btn-error text-white"
                           onClick={handleDelete}
                        >
                           <FaTrash />
                        </button>
                     </div>
                     <div
                        className="tooltip tooltip-left"
                        data-tip="Pay for this class"
                     >
                        <Link
                           className="btn bg-sky-800 text-white hover:bg-sky-900 text-white"
                           to={`/dashboard/student/payment/${classItem?._id}`}
                        >
                           <FaMoneyBill />
                        </Link>
                     </div>
                  </div>
               </td>
            </tr>
         )}
      </>
   );
};

export default SingleSelectedClass;
