/* eslint-disable react/prop-types */
import { Zoom } from "react-awesome-reveal";

const SectionHeader = ({ title, subtitle }) => {
   return (
      <Zoom>
         <div className="py-10 text-center">
            <div className="divider w-52 mx-auto m-0 before:bg-gray-300 after:bg-gray-300"></div>
            <div className="divider w-64 md:w-72 mx-auto m-0 before:bg-sky-500 after:bg-sky-500"></div>
            <div className="divider w-52 mx-auto m-0 before:bg-gray-300 after:bg-gray-300"></div>
            <h2 className="text-4xl">{title}</h2>
            <p className="text-lg">{subtitle}</p>
            <div className="divider w-52 mx-auto m-0 before:bg-gray-300 after:bg-gray-300"></div>
            <div className="divider w-64 md:w-72 mx-auto m-0 before:bg-sky-500 after:bg-sky-500"></div>
            <div className="divider w-52 mx-auto m-0 before:bg-gray-300 after:bg-gray-300"></div>
         </div>
      </Zoom>
   );
};

export default SectionHeader;
