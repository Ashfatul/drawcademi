import { useState } from "react";
import axiosFetch from "../../../utility/axios";
import Loader from "../../Loader/Loader";
import SectionHeader from "../../SectionHeader/SectionHeader";
import { useQuery } from "@tanstack/react-query";
import SingleClassItem from "./SingleClassItem";
import { Helmet } from "react-helmet-async";

const ManageClasses = () => {
   const [classes, setClasses] = useState([]);

   const { isLoading, isError, error, refetch } = useQuery({
      queryKey: ["myClasses"],
      queryFn: async () => {
         try {
            const res = await axiosFetch.get(`/all-classes`);
            setClasses(res.data);
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
            <title>Manage Classes | Admin | DrawCademi</title>
         </Helmet>
         <SectionHeader
            title="Manage Classes"
            subtitle="Manage classes from all the instructors."
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
                           <th>Status</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {classes.length < 1 ? (
                           <tr className="text-red-500 text-lg text-center">
                              <td colSpan="5">No Class Found</td>
                           </tr>
                        ) : (
                           classes?.map((classItem) => (
                              <SingleClassItem
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

export default ManageClasses;
