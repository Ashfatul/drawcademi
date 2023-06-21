import { FaCheck } from "react-icons/fa";
import { MdDoNotDisturb, MdFeedback } from "react-icons/md";
import Swal from "sweetalert2";
import axiosFetch from "../../../utility/axios";

/* eslint-disable react/prop-types */
const SingleClassItem = ({ classItem, refetch }) => {
   const handleApprove = () => {
      Swal.fire({
         title: "Do you want to approve this Class?",
         showDenyButton: false,
         showCancelButton: true,
         confirmButtonText: "Approve",
         denyButtonText: `Cancel`,
      }).then(async (result) => {
         if (result.isConfirmed) {
            Swal.fire("Approved!", "", "success");
            await axiosFetch.put(`/approve-class/${classItem._id}`);
            refetch();
         }
      });
   };

   const handleDeny = () => {
      Swal.fire({
         title: "Do you want to deny this Class?",
         showDenyButton: false,
         showCancelButton: true,
         confirmButtonText: "Deny",
         denyButtonText: `Cancel`,
      }).then(async (result) => {
         if (result.isConfirmed) {
            Swal.fire("Denied!", "", "success");
            await axiosFetch.put(`/deny-class/${classItem._id}`);
            refetch();
         }
      });
   };

   const handleFeedback = async () => {
      const { value: feedback } = await Swal.fire({
         input: "textarea",
         inputLabel: "Provide Feedback",
         inputPlaceholder: "Please write your feedback here...",
         confirmButtonText: "Send Feedback",
         inputAttributes: {
            "aria-label": "Please write your feedback here...",
         },
         showCancelButton: true,
      });

      if (feedback) {
         await axiosFetch
            .put(`/feedback/${classItem._id}`, { feedback })
            .then(() => {
               Swal.fire("Feedback Sent!", "", "success");
            });
      }
   };
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
         </td>
         <td>
            <p>{classItem?.status}</p>
         </td>
         <td>
            <div className="action-btns flex gap-2">
               <div className="tooltip tooltip-left" data-tip="Approve Class">
                  <button
                     className="btn bg-sky-800 text-white hover:bg-sky-900 btn-sm text-white"
                     onClick={handleApprove}
                     disabled={classItem?.status !== "pending"}
                  >
                     <FaCheck />
                  </button>
               </div>
               <div className="tooltip tooltip-left" data-tip="Deny Class">
                  <button
                     className="btn btn-warning btn-sm"
                     onClick={handleDeny}
                     disabled={classItem?.status !== "pending"}
                  >
                     <MdDoNotDisturb />
                  </button>
               </div>
               <div className="tooltip tooltip-left" data-tip="give Feedback">
                  <button
                     className="btn btn-info btn-sm text-white"
                     onClick={handleFeedback}
                  >
                     <MdFeedback />
                  </button>
               </div>
            </div>
         </td>
      </tr>
   );
};

export default SingleClassItem;
