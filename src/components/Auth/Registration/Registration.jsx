import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Required from "../../Required/Required";
import { useContext } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import toastr from "toastr";
import { FcGoogle } from "react-icons/fc";
const Registration = () => {
   const toPath = useLocation();
   const navigate = useNavigate();
   const { createNewUser, logOut } = useContext(AuthContext);
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();
   const { loginWithGoogle } = useContext(AuthContext);

   return (
      <div className="container">
         <div className="grid gap-10 grid-cols-1 lg:grid-cols-2 py-10">
            <div className="registration-info flex justify-center flex-col">
               <h1 className="text-4xl text-center md:text-6xl md:text-left">
                  DrawCademi Drawing Registration
               </h1>
               <h2 className="text-xl text-center md:text-left mt-5">
                  &quot;DrawCademi is an online drawing school catering to
                  administrators, instructors, and students. Administrators
                  manage the platform, while instructors offer a variety of
                  drawing classes. Students enroll and learn from experts&quot;
               </h2>
               <p className="text-right mt-5 text-xl text-sky-500">
                  - DrawCademi
               </p>

               <h3 className="text-3xl mb-5 mt-10">
                  Benefits of completing registration!!
               </h3>

               <ul className="list-disc list-inside">
                  <li className="pb-3">Access to diverse drawing lessons.</li>
                  <li className="pb-3">
                     Personalized dashboard for easy class management.
                  </li>
                  <li className="pb-3">
                     Seamless enrollment process for students.
                  </li>
                  <li className="pb-3">
                     Efficient class management tools for instructors.
                  </li>
                  <li className="pb-3">
                     Enhanced administrative control for administrators.
                  </li>
               </ul>
            </div>
            <div className="registration-form flex justify-center flex-col items-center">
               <div className="form-container w-full bg-gray-900 p-5 rounded-lg">
                  <h3 className="text-2xl text-center mb-10 text-white">
                     Register Now!
                  </h3>
                  <form
                     onSubmit={handleSubmit((data) => {
                        createNewUser(data).then((res) => {
                           if (res === "success") {
                              logOut().then(() => {
                                 navigate("/login");
                                 setTimeout(() => {
                                    toastr.info("Please login now");
                                 }, 2000);
                              });
                           }
                        });
                     })}
                  >
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="name-area">
                           <label className="text-white">
                              Name <Required />
                           </label>
                           <input
                              className="input w-full my-2"
                              type="text"
                              placeholder="Mark Henri"
                              {...register("name", {
                                 required: "Name is required",
                              })}
                           />
                           {errors.name && (
                              <div className="text-red-500">
                                 {errors.name?.message}
                              </div>
                           )}
                        </div>
                        <div className="email-area">
                           <label className="text-white">
                              Email <Required />
                           </label>
                           <input
                              className="input w-full my-2"
                              type="email"
                              placeholder="email@example.com"
                              {...register("email", {
                                 required: "Email is required",
                                 pattern: {
                                    value: /^.+@.+\..+$/,
                                    message: "Invalid Email Address",
                                 },
                              })}
                           />

                           {errors.email && (
                              <div className="text-red-500">
                                 {errors.email?.message}
                              </div>
                           )}
                        </div>
                        <div className="password-area">
                           <label className="text-white">
                              Password <Required />
                           </label>
                           <input
                              className="input w-full my-2"
                              type="password"
                              placeholder="password"
                              {...register("password", {
                                 required: "Password is required",
                                 pattern: {
                                    value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{6,})\S+$/,
                                    message:
                                       "Password must be at least 6 characters long, contain at least one uppercase letter, and one special character",
                                 },
                              })}
                           />
                           {errors.password && (
                              <div className="text-red-500">
                                 {errors.password?.message}
                              </div>
                           )}
                        </div>

                        <div className="confirm-password-area">
                           <label className="text-white">
                              Confirm Password <Required />
                           </label>

                           <input
                              className="input w-full my-2"
                              type="password"
                              placeholder="confirm password"
                              {...register("confirmPassword", {
                                 validate: (value) =>
                                    value === watch("password") ||
                                    "Passwords do not match",
                              })}
                           />

                           {errors.confirmPassword && (
                              <div className="text-red-500">
                                 {errors.confirmPassword?.message}
                              </div>
                           )}
                        </div>

                        <div className="photo-area">
                           <label className="text-white">
                              PhotoURL <Required />
                           </label>

                           <input
                              className="input w-full my-2"
                              type="url"
                              placeholder="https://imgbb.com/something.png"
                              {...register("photo", {
                                 required: "PhotoURL is required",
                                 pattern: {
                                    value: /^(https?|ftp):\/\/[^\s/$.?#]+\.[^\s]+$/,
                                    message: "Invalid photo url",
                                 },
                              })}
                           />
                           {errors.photo && (
                              <div className="text-red-500">
                                 {errors.photo?.message}
                              </div>
                           )}
                        </div>

                        <div className="gender-area">
                           <label className="text-white">Gender</label>

                           <select
                              {...register("gender")}
                              className="w-full input my-2"
                           >
                              <option value="">Select Gender</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                           </select>
                        </div>

                        <div className="phone-area">
                           <label className="text-white">Phone number</label>

                           <input
                              type="number"
                              {...register("phone")}
                              placeholder="Phone Number"
                              className="input my-2 w-full"
                           />
                        </div>

                        <div className="address">
                           <label className="text-white">Address</label>

                           <input
                              type="text"
                              {...register("address")}
                              placeholder="Address"
                              className="input my-2 w-full"
                           />
                        </div>
                     </div>

                     <input
                        type="submit"
                        className="btn w-full mt-5"
                        value="Register"
                     />
                  </form>
                  <div className="flex items-center justify-center gap-2 text-sm my-5 text-gray-200 before:h-px before:w-full after:h-px after:w-full before:bg-gray-200 after:bg-gray-200">
                     Or
                  </div>
                  <div className="google">
                     <button
                        className="btn w-full"
                        onClick={() =>
                           loginWithGoogle().then((res) => {
                              if (res === "success") {
                                 navigate(toPath.state || "/");
                              }
                           })
                        }
                     >
                        <FcGoogle /> Register with Google
                     </button>
                  </div>
                  <p className="mt-5 text-center text-white">
                     Already have account?{" "}
                     <NavLink
                        to="/login"
                        className="underline underline-offset-8 hover:text-orange-600"
                     >
                        Login
                     </NavLink>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Registration;
