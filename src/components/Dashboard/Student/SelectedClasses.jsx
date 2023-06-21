import { Helmet } from "react-helmet-async";
import SectionHeader from "../../SectionHeader/SectionHeader";
import Loader from "../../Loader/Loader";
import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axiosFetch from "../../../utility/axios";
import SingleSelectedClass from "./SingleSelectedClass";
import { AuthContext } from "../../../providers/AuthProvider";

const SelectedClasses = () => {
   const [selectedClass, setSelectedClass] = useState([]);
   const { user } = useContext(AuthContext);

   const { isLoading, isError, error, refetch } = useQuery({
      queryKey: ["selectedClasses"],
      queryFn: async () => {
         const studentClass = await axiosFetch.get(
            `/student-classes/selected/${user?.uid}/`
         );
         setSelectedClass(studentClass.data);

         return {
            studentClass: studentClass.data,
         };
      },
   });

   if (isError) {
      console.log(error);
   }

   return (
      <div>
         <Helmet>
            <title>Selected Classes | Student | DrawCademi</title>
         </Helmet>

         <SectionHeader
            title="My Selected Classes"
            subtitle="Below is the list of my selected classes"
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
                           <th>Seats</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {selectedClass?.length < 1 ? (
                           <tr className="text-red-500 text-xl text-center">
                              <td colSpan="5">No selected class found</td>
                           </tr>
                        ) : (
                           selectedClass?.map((classItem) => (
                              <SingleSelectedClass
                                 key={classItem._id}
                                 classItem={classItem}
                                 refetch={refetch}
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

export default SelectedClasses;
