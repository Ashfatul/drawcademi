import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import axiosFetch from "../../utility/axios";

const DashboardHeader = () => {
   const { user, userRole } = useContext(AuthContext);
   const [userData, setUserData] = useState({});

   useEffect(() => {
      axiosFetch.get(`/user/${user?.uid}`).then((res) => setUserData(res.data));
   }, [user]);

   return (
      <div className="mb-5">
         <h1 className="text-2xl">DrawCademi Backend</h1>
         <div className="divider"></div>
         <p className="text-xl text-center">
            Hi, <span className="text-sky-500">{userData?.name}</span>
         </p>
         <p className="text-lg text-center">
            Welcome to <span className="uppercase">{userRole}</span> Dashboard
         </p>
      </div>
   );
};

export default DashboardHeader;
