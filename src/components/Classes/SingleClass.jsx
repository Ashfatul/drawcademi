/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { FaUser } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";
import axiosFetch from "../../utility/axios";
import Loader from "../Loader/Loader";

const SingleClass = ({ item, refetch, selected }) => {
   const { userRole, user } = useContext(AuthContext);
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const selectClass = async (item) => {
      setLoading(true);
      if (user) {
         await axiosFetch.post(`/student-items/select/${user?.uid}`, { item });
         await refetch();
         setLoading(false);
      } else {
         navigate("/login");
         toastr.error("You must login to select class");
         setLoading(false);
      }
   };

   return (
      <>
         {loading ? (
            <Loader />
         ) : (
            <div
               className={`card card-compact w-full ${
                  item.availableSeats < 1
                     ? "bg-red-200 text-black"
                     : "bg-base-200"
               } shadow-lg`}
            >
               <figure>
                  <img
                     src={item.classImage}
                     alt="class image"
                     className="h-36 md:h-52 w-full object-cover object-center"
                  />
               </figure>
               <div className="card-body">
                  <h2 className="card-title uppercase">{item.classTitle}</h2>
                  <h3 className="text-lg flex items-center gap-2">
                     <FaUser /> {item.instructorName}
                  </h3>
                  <p className="text-lg">
                     Available seats:{" "}
                     <span className="text-sky-500">{item.availableSeats}</span>
                  </p>
                  <p className="text-lg">
                     Enrolled Student:{" "}
                     <span className="text-sky-500">
                        {item.enrolled_student}
                     </span>
                  </p>
                  <p className="text-lg">
                     Price: <span className="text-sky-500">${item.price}</span>
                  </p>
                  <button
                     className={`btn w-full bg-sky-800 text-white hover:bg-sky-900 disabled:text-black
               ${selected?.status === "paid" && "disabled:bg-info"} ${
                        selected?.status === "selected" && "disabled:bg-warning"
                     }`}
                     disabled={
                        (user && userRole !== "student") ||
                        item.availableSeats < 1 ||
                        selected?.status === "selected" ||
                        selected?.status === "paid"
                     }
                     onClick={() => selectClass(item)}
                  >
                     {selected?.status === "selected"
                        ? "Selected"
                        : selected?.status === "paid"
                        ? "Enrolled"
                        : item.availableSeats < 1
                        ? "No seat available"
                        : "Select Class"}
                  </button>
               </div>
            </div>
         )}
      </>
   );
};

export default SingleClass;
