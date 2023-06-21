import { Fade, Slide } from "react-awesome-reveal";
import SectionHeader from "../SectionHeader/SectionHeader";
import SingleInstructor from "./SingleInstructor";
import { Helmet } from "react-helmet-async";
import { useEffect, useState } from "react";
import axiosFetch from "../../utility/axios";
import Loader from "../Loader/Loader";

const Instructors = () => {
   const [instructors, setInstructors] = useState([]);
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      axiosFetch.get("/instructors/").then((res) => {
         setInstructors(res.data);
         setIsLoading(false);
      });
   }, []);
   return (
      <Fade>
         <div className="container">
            <Helmet>
               <title>Instructors | DrawCademi</title>
            </Helmet>
            <div>
               <SectionHeader
                  title="List of Instructors"
                  subtitle="Below is a list of all our talented instructors."
               />

               {isLoading ? (
                  <Loader />
               ) : (
                  <>
                     {instructors.length < 1 ? (
                        <div className="text-center mb-10">
                           No Instructor Found
                        </div>
                     ) : (
                        <div className="instructors-container mb-10 grid grid-cols-1 md:geid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                           <Slide>
                              {instructors.map((user) => (
                                 <SingleInstructor
                                    key={user._id}
                                    userItem={user}
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

export default Instructors;
