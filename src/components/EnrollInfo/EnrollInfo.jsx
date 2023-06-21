import { useEffect, useState } from "react";
import axiosFetch from "../../utility/axios";
import Testimonial from "../Testimonial/Testimonial";
import Marquee from "react-fast-marquee";
import { Typewriter } from "react-simple-typewriter";

const EnrollInfo = () => {
   const [reviews, setReviews] = useState([]);

   useEffect(() => {
      axiosFetch.get("/reviews").then((res) => {
         setReviews(res.data);
      });
   }, []);

   return (
      <div className="bg-sky-800 py-10 mt-10 text-center">
         <div className="mx-auto max-w-screen-2xl px-3 md:px-0">
            <h1 className="text-4xl md:text-6xl mb-10 text-white">
               Learn to Draw <br className="sm:hidden" />
               <span className="underline underline-offset-8">
                  <Typewriter
                     loop={true}
                     cursorBlinking={true}
                     delaySpeed="1000"
                     words={["Sketch", "Doodles", "Landscape", "Cartoon"]}
                  />
               </span>
            </h1>
            <h2 className="max-w-screen-sm mx-auto text-white">
               Unleash your drawing skills at DrawCademi Drawing School! Expert
               teachers, diverse techniques, and personalized guidance. Master
               portraits, landscapes, and more. Join us and nurture your
               artistic potential today!
            </h2>

            <h1 className="text-3xl underline underline-offset-8 py-10 text-white">
               What Our Clients Say
            </h1>
            <Marquee speed={100} className="z-0">
               {reviews.map((review) => (
                  <Testimonial key={review._id} review={review} />
               ))}
            </Marquee>
         </div>
      </div>
   );
};

export default EnrollInfo;
