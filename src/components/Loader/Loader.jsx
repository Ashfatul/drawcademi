import { Bars } from "react-loader-spinner";
const Loader = ({ height }) => {
   return (
      <div
         role="status"
         className={`flex justify-center items-center ${
            height ? "min-h-fit" : "min-h-screen"
         }`}
      >
         <Bars
            height="80"
            width="80"
            color="#0284c7"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
         />
      </div>
   );
};

export default Loader;
