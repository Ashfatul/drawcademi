/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosFetch from "../../utility/axios";
import Loader from "../Loader/Loader";

const SingleInstructor = ({ userItem }) => {
   const [classCount, setClassCount] = useState();
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      axiosFetch.get(`/classes-of/${userItem?.authID}`).then((res) => {
         setClassCount(res.data.length);
         setIsLoading(false);
      });
   }, [userItem?.authID]);

   return (
      <>
         {isLoading ? (
            <Loader />
         ) : (
            <div className="card card-compact w-full bg-base-200 shadow-lg">
               <div className="card-body">
                  <div className="img mx-auto">
                     <img
                        src={userItem.photo}
                        alt={userItem.name}
                        className="h-52 w-52 rounded-full object-cover object-center border-b-8 border-blue-200"
                     />
                  </div>
                  <div className="info">
                     <h2 className="card-title text-center block">
                        {userItem?.name}
                     </h2>
                     <p className="text-center text-lg">{userItem?.email}</p>
                     <p className="text-center text-lg">
                        Takes <span className="text-sky-500">{classCount}</span>{" "}
                        {classCount > 1 ? "Classes" : "Class"}
                     </p>

                     <Link
                        to={`/classes-of/${userItem?.authID}`}
                        className="btn bg-sky-800 text-white hover:bg-sky-900 w-full mt-5 text-center"
                     >
                        See Classes
                     </Link>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default SingleInstructor;
