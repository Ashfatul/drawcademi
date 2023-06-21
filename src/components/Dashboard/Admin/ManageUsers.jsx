import SectionHeader from "../../SectionHeader/SectionHeader";
import SingleUserData from "./SingleUserData";
import axiosFetch from "../../../utility/axios";
import { useState } from "react";
import Loader from "../../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const ManageUsers = () => {
   const [users, setUsers] = useState([]);

   const { isLoading, isError, error, refetch } = useQuery({
      queryKey: ["users"],
      queryFn: async () => {
         try {
            const res = await axiosFetch.get("/users");
            setUsers(res.data);
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
            <title>Manage User | Admin | DrawCademi</title>
         </Helmet>
         <SectionHeader
            title="Manage Users"
            subtitle="You can manage users form here"
         />

         <p className="text-lg mb-5">
            Total Users: <span className="text-sky-500">{users?.length}</span>
         </p>

         <div className="user-table overflow-x-auto mb-10">
            <div className="w-72 md:w-full">
               {isLoading ? (
                  <Loader />
               ) : (
                  <table className="table table-zebra mb-5">
                     <thead className="bg-sky-800 text-white hover:bg-sky-900 text-lg">
                        <tr>
                           <th>Photo</th>
                           <th>Name</th>
                           <th>Email</th>
                           <th>Role</th>
                           <th>Phone</th>
                           <th>Gender</th>
                           <th>Address</th>
                           <th>Action</th>
                        </tr>
                     </thead>
                     <tbody>
                        {users.map((user) => (
                           <SingleUserData
                              key={user._id}
                              user={user}
                              refetch={refetch}
                           />
                        ))}
                     </tbody>
                  </table>
               )}
            </div>
         </div>
      </div>
   );
};

export default ManageUsers;
