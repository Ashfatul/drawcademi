import { useContext, useState } from "react";
import axiosFetch from "../../../utility/axios";
import Loader from "../../Loader/Loader";
import SectionHeader from "../../SectionHeader/SectionHeader";
import SingleClassRow from "./SingleClassRow";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const MyClasses = () => {
   const [myClasses, setMyClasses] = useState([]);
   const { user } = useContext(AuthContext);

   const { isLoading, isError, error, refetch } = useQuery({
      queryKey: ["myClasses"],
      queryFn: async () => {
         try {
            const res = await axiosFetch.get(`/my-classes/${user?.uid}`);
            setMyClasses(res.data);
            return res.data;
         } catch (error) {
            console.log(error);
         }
      },
   });

   if (isError) {
      console.log(error);
   }

   return (
      <div>
         <Helmet>
            <title>My Class | Instructor | DrawCademi</title>
         </Helmet>
         <SectionHeader
            title="My Classes"
            subtitle="Below is the list of classes you have created."
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
                           <th>Enroll</th>
                           <th>Status</th>
                           <th>Admin Feedback</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {myClasses.length < 1 ? (
                           <tr className="text-red-500 text-lg text-center">
                              <td colSpan="6">No Class Found</td>
                           </tr>
                        ) : (
                           myClasses?.map((classItem) => (
                              <SingleClassRow
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

export default MyClasses;
