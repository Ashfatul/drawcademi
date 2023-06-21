import { useContext, useState } from "react";
import axiosFetch from "../../utility/axios";
import SectionHeader from "../SectionHeader/SectionHeader";
import SingleClass from "./SingleClass";
import { Slide } from "react-awesome-reveal";
import Loader from "../Loader/Loader";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../providers/AuthProvider";

const PopularClasses = () => {
  const [popular, setPopular] = useState([]);
  const [selected, setSelected] = useState([]);
  const { user } = useContext(AuthContext);

  const { isLoading, isError, error, refetch } = useQuery({
    queryKey: ["popularClasses"],
    queryFn: async () => {
      const popularClass = await axiosFetch.get("/popular-classes");
      setPopular(popularClass.data);

      const studentClass = await axiosFetch.get(
        `/student-classes/${user?.uid}`
      );
      setSelected(studentClass.data);

      return {
        popularClass: popularClass.data,
        studentClass: studentClass.data,
      };
    },
  });

  if (isError) {
    console.log(error);
  }

  return (
    <div className="container">
      <SectionHeader
        title="Popular Classes"
        subtitle="Most popular 6 classes are listed below"
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {popular.length < 1 ? (
            <div className="text-center">No Class Found</div>
          ) : (
            <div className="classes-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-10">
              <Slide>
                {popular?.map((item) => (
                  <SingleClass
                    key={item._id}
                    item={item}
                    selected={selected.find(
                      (selectItem) => item._id === selectItem.classItem._id
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
  );
};

export default PopularClasses;
