import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axiosFetch from "../../utility/axios";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const UserProfile = () => {
   const [authUser, setAuthUser] = useState();
   const { user } = useContext(AuthContext);
   useEffect(() => {
      axiosFetch.get(`/user/${user?.uid}`).then((res) => setAuthUser(res.data));
   }, [user]);

   return (
      <div className="container">
         <Helmet>
            <title>User Profile | DrawCademi</title>
         </Helmet>
         <SectionHeader title="User Profile" />
         <div className="block text-center md:flex md:text-left max-w-screen-sm justify-center items-center mx-auto pb-10 gap-5">
            <div className="user-img">
               <img
                  src={authUser?.photo}
                  alt={authUser?.name}
                  className="h-52 w-52 rounded-md bg-gray-200 object-cover object-center mx-auto mb-5"
               />
            </div>
            <div className="info">
               <h2 className="text-2xl text-sky-500">{authUser?.name}</h2>
               <p>
                  User Role:{" "}
                  <span className="capitalize">{authUser?.role}</span>
               </p>
               <p>Email: {authUser?.email}</p>
               <p>Gender: {authUser?.gender || "---"}</p>
               <p>Phone: {authUser?.phone || "---"}</p>
               <p>Address: {authUser?.address || "---"}</p>
               <Link to={`/profile/update/${user?.uid}`} className="btn mt-5">
                  Update Profile
               </Link>
            </div>
         </div>
      </div>
   );
};

export default UserProfile;
