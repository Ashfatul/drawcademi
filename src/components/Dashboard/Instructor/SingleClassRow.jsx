import { FaPen } from "react-icons/fa";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const SingleClassRow = ({ classItem }) => {
   return (
      <tr>
         <td>
            <img
               src={classItem?.classImage}
               alt={classItem?.classTitle}
               className="h-12 w-12"
            />
         </td>
         <td>
            <h2 className="text-xl">{classItem?.classTitle}</h2>
            <p>{classItem?.instructorName}</p>
            <p>{classItem?.instructorEmail}</p>
            <p>
               Price: <span className="text-sky-500">${classItem?.price}</span>
            </p>
         </td>
         <td>
            <p>
               Available Seats:{" "}
               <span className="text-sky-500">{classItem?.availableSeats}</span>
            </p>
            <p>
               Enrolled Student:{" "}
               <span className="text-sky-500">
                  {classItem?.enrolled_student}
               </span>
            </p>
         </td>
         <td>
            <p>{classItem?.status}</p>
         </td>
         <td>
            <p>{classItem?.feedback || "N/A"}</p>
         </td>
         <td>
            <div className="action-btns">
               <div className="tooltip tooltip-left" data-tip="Update Class">
                  <Link
                     className="btn btn-primary"
                     to={`/dashboard/instructor/update-class/${classItem?._id}`}
                     disabled={classItem?.status === "approved"}
                  >
                     <FaPen />
                  </Link>
               </div>
            </div>
         </td>
      </tr>
   );
};

export default SingleClassRow;
