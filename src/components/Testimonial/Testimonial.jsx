/* eslint-disable react/prop-types */
import { FaStar } from "react-icons/fa";

const Testimonial = ({ review }) => {
  return (
    <div className="testimonial-container mx-3">
      <div className="card w-96 h-60 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{review?.name}</h2>
          <small className="text-left italic">{review?.designation}</small>
          <div className="rating flex items-center">
            Rating: {review?.rating} <FaStar style={{ fill: "orange" }} />
          </div>
          <p className="text-left">{review?.review}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
