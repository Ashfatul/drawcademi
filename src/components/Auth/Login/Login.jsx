import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Required from "../../Required/Required";
import { useContext, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
const Login = () => {
   const [typePassword, setTypePassword] = useState(true);
   const [eyeOpen, setEyeOpen] = useState(false);
   const { logIn, loginWithGoogle } = useContext(AuthContext);
   const toPath = useLocation();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const navigate = useNavigate();

   const handlePasswordDisplay = () => {
      setTypePassword(!typePassword);
      setEyeOpen(!eyeOpen);
   };

   return (
      <div className="container">
         <div className="grid gap-10 grid-cols-1 md:grid-cols-2 p-0 md:p-10 py-10">
            <div className="login-info flex justify-center flex-col">
               <h1 className="text-4xl text-center md:text-6xl md:text-left">
                  DrawCademi User Login
               </h1>
               <h2 className="text-xl text-center md:text-left mt-10">
                  &quot;DrawCademi is an online drawing school catering to
                  administrators, instructors, and students. Administrators
                  manage the platform, while instructors offer a variety of
                  drawing classes. Students enroll and learn from experts&quot;
               </h2>
               <p className="text-right mt-5 text-xl text-sky-500">
                  - DrawCademi
               </p>
            </div>
            <div className="login-form flex justify-center flex-col items-center">
               <div className="form-container w-full lg:w-96 bg-gray-900 p-5 rounded-lg">
                  <h3 className="text-2xl text-center mb-10 text-white">
                     Welcome Back!
                  </h3>
                  <form
                     onSubmit={handleSubmit((data) =>
                        logIn(data).then((res) => {
                           if (res === "success") {
                              navigate(toPath.state || "/");
                           }
                        })
                     )}
                  >
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

                     <label className="text-white">
                        Password <Required />
                     </label>
                     <div className="password-field relative">
                        <input
                           className="input w-full my-2"
                           type={typePassword ? "password" : "text"}
                           placeholder="password"
                           {...register("password", { required: true })}
                        />
                        <div className="icon" onClick={handlePasswordDisplay}>
                           {eyeOpen ? (
                              <BsEyeFill className="text-2xl text-black absolute right-3 cursor-pointer hover:text-sky-500 top-2/4 translate-y-[calc(-50%)]" />
                           ) : (
                              <BsEyeSlashFill className="text-2xl text-black absolute right-3 cursor-pointer hover:text-sky-500 top-2/4 translate-y-[calc(-50%)]" />
                           )}
                        </div>
                     </div>
                     {errors.password && (
                        <div className="text-red-500">Password is required</div>
                     )}

                     <input
                        type="submit"
                        className="btn w-full mt-5"
                        value="Login"
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
                        <FcGoogle /> Login with Google
                     </button>
                  </div>
                  <p className="mt-5 text-center text-white">
                     New Here? go to{" "}
                     <NavLink
                        to="/registration"
                        className="underline underline-offset-8 hover:text-orange-600"
                     >
                        Registration
                     </NavLink>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
