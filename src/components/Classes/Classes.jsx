import { Slide } from "react-awesome-reveal";
import SectionHeader from "../SectionHeader/SectionHeader";
import SingleClass from "./SingleClass";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import axiosFetch from "../../utility/axios";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";
const Classes = () => {
   const [classes, setClasses] = useState([]);
   const [selected, setSelected] = useState([]);
   const { user } = useContext(AuthContext);

   const { isLoading, isError, error, refetch } = useQuery({
      queryKey: ["classes"],
      queryFn: async () => {
         const allClasses = await axiosFetch.get("/classes");
         setClasses(allClasses.data);

         const studentClass = await axiosFetch.get(
            `/student-classes/${user?.uid}`
         );
         setSelected(studentClass.data);

         return {
            allClasses: allClasses.data,
            studentClass: studentClass.data,
         };
      },
   });

   if (isError) {
      console.log(error);
   }

   return (
      <div className="container">
         <Helmet>
            <title>Classes | DrawCademi</title>
         </Helmet>
         <div>
            <SectionHeader
               title="List of Classes"
               subtitle="Below is a list of all our classes."
            />

            {isLoading ? (
               <Loader />
            ) : (
               <>
                  {classes.length < 1 ? (
                     <div className="text-center mb-10">No Classes Found</div>
                  ) : (
                     <div className="instructors-container mb-10 grid grid-cols-1 md:geid-cols-2 lg:grid-cols-3 gap-10">
                        <Slide>
                           {classes.map((item) => (
                              <SingleClass
                                 key={item._id}
                                 item={item}
                                 refetch={refetch}
                                 selected={selected.find(
                                    (selectItem) =>
                                       item._id === selectItem?.classItem._id
                                 )}
                              />
                           ))}
                        </Slide>
                     </div>
                  )}
               </>
            )}
         </div>
      </div>
   );
};

export default Classes;
