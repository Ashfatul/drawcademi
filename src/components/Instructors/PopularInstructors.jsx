import { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import SingleInstructor from "./SingleInstructor";
import axiosFetch from "../../utility/axios";
import Loader from "../Loader/Loader";
import { Slide } from "react-awesome-reveal";

const PopularInstructors = () => {
  const [popularInstructors, setPopularInstructors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axiosFetch.get("/instructors/?limit=6").then((res) => {
      setPopularInstructors(res.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <div className="container">
      <SectionHeader
        title="Popular Instructors"
        subtitle="Most popular 6 instructors are listed below"
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {popularInstructors.length < 1 ? (
            <div className="text-center">No Instructor Found</div>
          ) : (
            <div className="instructor-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              <Slide>
                {popularInstructors.map((user) => (
                  <SingleInstructor key={user._id} userItem={user} />
                ))}
              </Slide>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PopularInstructors;
