import { Link } from "react-router-dom";

const Footer = () => {
   return (
      <div className="bg-gray-900 text-white">
         <div className="container">
            <div className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 py-10 text-center lg:text-left">
               <div className="">
                  <h2 className="text-2xl mb-5">DrawCademi</h2>
                  <p>
                     DrawCademi is a drawing school with diverse lessons taught
                     by skilled teachers. Students select classes and access
                     dedicated dashboards.
                  </p>
               </div>
               <div className="">
                  <h3 className="text-lg font-bold text-gray-300 mb-5 underline underline-offset-8">
                     Address
                  </h3>
                  <p>123 Art Street, Creativityville, Drawlandia, D1R3CT5</p>

                  <h3 className="text-lg font-bold text-gray-300 mb-5 mt-5 underline underline-offset-8">
                     Contact Us
                  </h3>
                  <p>drawcademi@example.com</p>
               </div>
               <div className="">
                  <h3 className="text-lg font-bold text-gray-300 mb-5 underline underline-offset-8">
                     Important Links
                  </h3>
                  <ul>
                     <li>
                        <Link
                           to="#"
                           className="hover:underline hover:underline-offset-4 block mb-5"
                        >
                           Terms & Conditions
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="#"
                           className="hover:underline hover:underline-offset-4 block mb-5"
                        >
                           Privacy Policy
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="#"
                           className="hover:underline hover:underline-offset-4 block mb-5"
                        >
                           Cookies Policy
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="#"
                           className="hover:underline hover:underline-offset-4 block mb-5"
                        >
                           EULA
                        </Link>
                     </li>
                  </ul>
               </div>
               <div className="">
                  <h3 className="text-lg font-bold text-gray-300 mb-5 underline underline-offset-8">
                     Social Media
                  </h3>
                  <ul>
                     <li>
                        <Link
                           to="#"
                           className="hover:underline hover:underline-offset-4 block mb-5"
                        >
                           Facebook
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="#"
                           className="hover:underline hover:underline-offset-4 block mb-5"
                        >
                           Twitter
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="#"
                           className="hover:underline hover:underline-offset-4 block mb-5"
                        >
                           Instagram
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="#"
                           className="hover:underline hover:underline-offset-4 block mb-5"
                        >
                           Linkedin
                        </Link>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="p-5 bg-slate-800 text-center">
            <p>
               Copyright &copy; {new Date().getFullYear()} - All right reserved.
            </p>
            <p>
               Powered by<b> DrawCademi</b>
            </p>
         </div>
      </div>
   );
};

export default Footer;
