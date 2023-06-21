import { useForm } from "react-hook-form";
import SectionHeader from "../../SectionHeader/SectionHeader";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Loader from "../../Loader/Loader";
import axiosFetch from "../../../utility/axios";
import toastr from "toastr";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const UpdateClass = () => {
   const navigate = useNavigate();
   const [classData, setClassData] = useState({});
   const { handleSubmit, register } = useForm();
   const { loading } = useContext(AuthContext);
   const { id } = useParams();

   useEffect(() => {
      axiosFetch.get(`/class/${id}`).then((res) => setClassData(res.data));
   }, [id]);

   const updateMyClass = async (data) => {
      const filteredData = Object.fromEntries(
         Object.entries(data).filter(([_, value]) => value !== "")
      );

      await axiosFetch.patch(`/update-class/${id}`, filteredData);
      navigate("/dashboard/instructor/my-classes");
      toastr.info("Class update successful");
   };

   return (
      <div>
         <Helmet>
            <title>Update Class | Instructor | DrawCademi</title>
         </Helmet>
         {loading ? (
            <Loader />
         ) : (
            <form
               onSubmit={handleSubmit((data) => updateMyClass(data))}
               className="rounded-lg bg-base-300 p-5 w-full md:w-2/3 mx-auto"
            >
               <SectionHeader
                  title="Update Class"
                  subtitle="Only provide information you want to update"
               />
               <label>Class Name</label>
               <input
                  type="text"
                  {...register("classTitle")}
                  className="input w-full border my-2"
                  placeholder={classData?.classTitle}
               />

               <label>Class Image URL</label>
               <input
                  type="url"
                  {...register("classImage")}
                  className="input w-full border my-2"
                  placeholder={classData?.classImage}
               />

               <label>Available Seats</label>
               <input
                  type="number"
                  {...register("availableSeats", { valueAsNumber: true })}
                  className="input w-full border my-2"
                  placeholder={classData?.availableSeats}
               />
               <label>Price</label>
               <input
                  type="number"
                  {...register("price", { valueAsNumber: true })}
                  className="input w-full border my-2"
                  placeholder={classData?.price}
               />

               <input
                  type="submit"
                  value="Update Class"
                  className="w-full btn mt-5 bg-sky-800 text-white hover:bg-sky-900"
               />
            </form>
         )}
      </div>
   );
};

export default UpdateClass;
