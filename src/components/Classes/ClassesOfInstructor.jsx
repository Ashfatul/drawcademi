import { Fade, Slide } from "react-awesome-reveal";
import SectionHeader from "../SectionHeader/SectionHeader";
import { Helmet } from "react-helmet-async";
import { useContext, useState } from "react";
import axiosFetch from "../../utility/axios";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import SingleClass from "./SingleClass";
import { AuthContext } from "../../providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

const ClassesOfInstructor = () => {
   const [classes, setClasses] = useState([]);
   const [studentClasses, setStudentClasses] = useState([]);
   const { user } = useContext(AuthContext);
   const { id } = useParams();

   const { isLoading, isError, error, refetch } = useQuery({
      queryKey: ["classes"],
      queryFn: async () => {
         const allClasses = await axiosFetch.get(`/classes-of/${id}`);
         setClasses(allClasses.data);

         const studentClass = await axiosFetch.get(
            `/student-classes/${user?.uid}`
         );
         setStudentClasses(studentClass.data);

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
      <Fade>
         <div className="container">
            <Helmet>
               <title>Instructor Classes | DrawCademi</title>
            </Helmet>
            <div>
               <SectionHeader
                  title="Classes of Instructor"
                  subtitle={`Below is a list of all classes of instructor.`}
               />

               {isLoading ? (
                  <Loader />
               ) : (
                  <>
                     {classes?.length < 1 ? (
                        <div className="text-center text-red-500 mb-10">
                           No class Found
                        </div>
                     ) : (
                        <div className="instructors-container mb-10 grid grid-cols-1 md:geid-cols-2 lg:grid-cols-3 gap-10">
                           <Slide>
                              {classes.map((item) => (
                                 <SingleClass
                                    key={item._id}
                                    item={item}
                                    selected={studentClasses.find(
                                       (selectItem) =>
                                          item._id === selectItem.classItem._id
                                    )}
                                    refetch={refetch}
                                 />
                              ))}
                           </Slide>
                        </div>
                     )}
                  </>
               )}
            </div>
         </div>
      </Fade>
   );
};

export default ClassesOfInstructor;
