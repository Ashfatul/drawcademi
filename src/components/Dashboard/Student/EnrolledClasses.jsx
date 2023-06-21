import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import axiosFetch from "../../../utility/axios";
import { AuthContext } from "../../../providers/AuthProvider";
import SectionHeader from "../../SectionHeader/SectionHeader";
import Loader from "../../Loader/Loader";
import SingleEnrolledClass from "./SingleEnrolledClass";

const EnrolledClasses = () => {
   const [enrolled, setEnrolled] = useState();
   const { user } = useContext(AuthContext);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setIsLoading(true);
      axiosFetch.get(`/student-classes/enrolled/${user?.uid}`).then((res) => {
         setEnrolled(res.data);
         setIsLoading(false);
      });
   }, [user]);

   return (
      <div>
         <Helmet>
            <title>Enrolled Classes | Student | DrawCademi</title>
         </Helmet>
         <SectionHeader
            title="Enrolled Classes"
            subtitle="Below is the list of my enrolled classes"
         />

         <div className="user-table overflow-x-auto mb-10">
            <div className="w-72 md:w-full">
               {isLoading ? (
                  <Loader />
               ) : (
                  <table className="table table-zebra mb-5">
                     <thead className="bg-sky-800 text-white hover:bg-sky-900 text-lg">
                        <tr>
                           <th>Photo</th>
                           <th>Class Info</th>
                           <th>Instructor Info</th>
                           <th>Seats</th>
                        </tr>
                     </thead>
                     <tbody>
                        {enrolled?.length < 1 ? (
                           <tr className="text-red-500 text-xl text-center">
                              <td colSpan="4">No Enrolled class found</td>
                           </tr>
                        ) : (
                           enrolled?.map((classItem) => (
                              <SingleEnrolledClass
                                 key={classItem._id}
                                 classItem={classItem}
                              />
                           ))
                        )}
                     </tbody>
                  </table>
               )}
            </div>
         </div>
      </div>
   );
};

export default EnrolledClasses;
