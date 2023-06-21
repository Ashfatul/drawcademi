import { useForm } from "react-hook-form";
import SectionHeader from "../../SectionHeader/SectionHeader";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Loader from "../../Loader/Loader";
import axiosFetch from "../../../utility/axios";
import toastr from "toastr";
import { useNavigate } from "react-router-dom";
import Required from "../../Required/Required";
import { Helmet } from "react-helmet-async";
const AddClass = () => {
   const [userData, setUserData] = useState({});
   const navigate = useNavigate();
   const {
      handleSubmit,
      register,
      formState: { errors },
   } = useForm();
   const { user, loading } = useContext(AuthContext);

   useEffect(() => {
      axiosFetch.get(`/user/${user?.uid}`).then((res) => setUserData(res.data));
   }, [user]);

   const addNewClass = async (data) => {
      try {
         await axiosFetch.post("/add-class", data);
         toastr.success("New Class Added Successfully");
         navigate("/dashboard/instructor/my-classes");
      } catch (error) {
         toastr.error("Failed to add class");
         console.log(error);
      }
   };
   return (
      <div>
         <Helmet>
            <title>Add Class | Instructor | DrawCademi</title>
         </Helmet>
         {loading ? (
            <Loader />
         ) : (
            <form
               onSubmit={handleSubmit((data) => addNewClass(data))}
               className="rounded-lg bg-base-300 p-5 w-full md:w-2/3 mx-auto"
            >
               <SectionHeader
                  title="Create a new class"
                  subtitle="Please provide info to create new class"
               />
               <input
                  type="hidden"
                  {...register("authID")}
                  className="input w-full border my-2"
                  value={user?.uid}
               />
               <input
                  type="hidden"
                  {...register("createdOn")}
                  className="input w-full border my-2"
                  value={new Date()}
               />
               <label>
                  Class Name <Required />
               </label>
               <input
                  type="text"
                  {...register("classTitle", {
                     required: "Class name is required",
                  })}
                  className="input w-full border my-2"
                  placeholder="Learn to draw awesome sketch"
               />
               <div className="text-red-500">{errors?.classTitle?.message}</div>

               <label>
                  Class Image URL <Required />
               </label>
               <input
                  type="url"
                  {...register("classImage", {
                     required: "Class image is required",
                     pattern: {
                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                        message: "Invalid image url",
                     },
                  })}
                  className="input w-full border my-2"
                  placeholder="https://imgbb.com/something.png"
               />
               <div className="text-red-500">{errors?.ClassImage?.message}</div>

               <label>
                  Instructor Name <Required />
               </label>
               <input
                  type="text"
                  {...register("instructorName", { value: userData?.name })}
                  className="input w-full border my-2"
                  disabled
               />
               <label>
                  Instructor Email <Required />
               </label>
               <input
                  type="email"
                  {...register("instructorEmail", { value: user.email })}
                  className="input w-full border my-2"
                  disabled
               />

               <label>
                  Available Seats <Required />
               </label>
               <input
                  type="number"
                  {...register("availableSeats", {
                     required: "Available seats can't be empty",
                     valueAsNumber: true,
                     min: {
                        value: 1,
                        message: "Minimum 1 available seat is required",
                     },
                  })}
                  className="input w-full border my-2"
                  placeholder="100"
               />
               <div className="text-red-500">
                  {errors?.availableSeats?.message}
               </div>
               <label>
                  Price <Required />
               </label>
               <input
                  type="number"
                  {...register("price", {
                     required: "Price is required",
                     valueAsNumber: true,
                     min: {
                        value: 0,
                        message: "Minimum price is 0",
                     },
                  })}
                  className="input w-full border my-2"
                  placeholder="100"
               />
               <div className="text-red-500">{errors?.price?.message}</div>

               <input
                  type="hidden"
                  {...register("status")}
                  className="input w-full border my-2"
                  value="pending"
               />
               <input
                  type="hidden"
                  {...register("enrolled_student", { valueAsNumber: true })}
                  className="input w-full border my-2"
                  value={0}
               />
               <input
                  type="hidden"
                  {...register("feedback")}
                  className="input w-full border my-2"
                  value=""
               />

               <input
                  type="submit"
                  value="Create New Class"
                  className="w-full btn mt-5 bg-sky-800 text-white hover:bg-sky-900"
               />
            </form>
         )}
      </div>
   );
};

export default AddClass;
