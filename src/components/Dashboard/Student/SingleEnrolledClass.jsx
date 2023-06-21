import { useEffect, useState } from "react";
import axiosFetch from "../../../utility/axios";

/* eslint-disable react/prop-types */
const SingleEnrolledClass = ({ classItem }) => {
   const [classes, setClasses] = useState();
   useEffect(() => {
      axiosFetch.get("/classes").then((res) => {
         setClasses(res.data);
      });
   }, []);

   const availableSeats = classes?.find(
      (cls) => cls._id === classItem.classItem._id
   );
   return (
      <>
         <tr>
            <td>
               <img
                  src={classItem?.classItem?.classImage}
                  alt={classItem?.classItem?.classTitle}
                  className="h-12 w-12"
               />
            </td>
            <td>
               <h2 className="text-xl">{classItem?.classItem?.classTitle}</h2>

               <p>
                  Price:{" "}
                  <span className="text-sky-500">
                     ${classItem?.classItem?.price}
                  </span>
               </p>
            </td>
            <td>
               <p>{classItem?.classItem?.instructorName}</p>
               <p>{classItem?.classItem?.instructorEmail}</p>
            </td>
            <td>
               <p>
                  Available Seats:{" "}
                  <span className="text-sky-500">
                     {availableSeats?.availableSeats}
                  </span>
               </p>
            </td>
         </tr>
      </>
   );
};

export default SingleEnrolledClass;
