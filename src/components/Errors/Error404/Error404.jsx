import { Link } from "react-router-dom";
import { FaArrowLeft, FaSadCry } from "react-icons/fa";
import { BiError } from "react-icons/bi";

const Error404 = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col bg-slate-500">
      <div className="bg-white p-10 w-full">
        <div className="mx-auto w-fit">
          <div className="code text-8xl font-bold  flex items-center">
            <BiError className="text-8xl text-orange-500" />4
            <span className="">0</span>4
          </div>
          <div className="error text-3xl uppercase flex items-center gap-3">
            Page Not Found <FaSadCry className="text-orange-500" />
          </div>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 mt-10 border px-5 py-2 bg-orange-500 rounded-lg text-white hover:bg-orange-600"
          >
            <FaArrowLeft /> Back To Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404;
