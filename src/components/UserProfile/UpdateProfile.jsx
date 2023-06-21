import { useEffect, useState } from "react";
import SectionHeader from "../SectionHeader/SectionHeader";
import { useNavigate, useParams } from "react-router-dom";
import axiosFetch from "../../utility/axios";
import { useForm } from "react-hook-form";
import toastr from "toastr";
import { Helmet } from "react-helmet-async";

const UpdateProfile = () => {
   const [user, setUser] = useState({});
   const { register, handleSubmit } = useForm();
   const { id } = useParams();
   const navigate = useNavigate();
   useEffect(() => {
      axiosFetch.get(`/user/${id}`).then((res) => setUser(res.data));
   }, [id]);

   const updateProfile = async (data) => {
      const filteredData = Object.fromEntries(
         Object.entries(data).filter(([_, value]) => value !== "")
      );

      await axiosFetch.patch(`/update-profile/${user._id}`, filteredData);
      navigate("/profile");
      toastr.info("Profile update successful");
   };
   return (
      <div className="container py-10">
         <Helmet>
            <title>Update Profile | DrawCademi</title>
         </Helmet>
         <form
            className="update-form max-w-screen-md bg-base-300 px-3 py-5 rounded-lg mx-auto"
            onSubmit={handleSubmit((data) => updateProfile(data))}
         >
            <SectionHeader title="Update Profile" />
            <label>Name</label>
            <input
               type="text"
               className="input w-full my-3"
               placeholder={user?.name}
               {...register("name")}
            />
            <label>Photo</label>
            <input
               type="url"
               className="input w-full my-3"
               placeholder={user?.photo}
               {...register("photo")}
            />
            <label>Gender</label>
            <select className="input w-full my-3" {...register("gender")}>
               <option value="">Select</option>
               <option value="male">Male</option>
               <option value="female">Female</option>
               <option value="other">Other</option>
            </select>
            <label>Phone</label>
            <input
               type="number"
               className="input w-full my-3"
               placeholder={user?.phone || "Phone number"}
               {...register("phone")}
            />
            <label>Address</label>
            <input
               type="text"
               className="input w-full my-3"
               placeholder={user?.address || "Address"}
               {...register("address")}
            />

            <input
               type="submit"
               className="btn w-full mt-10 bg-sky-800 text-white hover:bg-sky-900"
               defaultValue="Update Profile"
            />
         </form>
      </div>
   );
};

export default UpdateProfile;
