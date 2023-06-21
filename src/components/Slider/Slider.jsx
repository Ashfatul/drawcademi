import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";

import sketch from "../../assets/slider/sketch.jpg";
import doodle from "../../assets/slider/doodle.webp";
import landscape from "../../assets/slider/landscape.jpg";
import cartoon from "../../assets/slider/cartoon.jpg";

const Slider = () => {
   return (
      <div className="container">
         <Swiper
            slidesPerView={1}
            spaceBetween={30}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            pagination={{
               clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="h-[200px] md:h-[400px] rounded-lg overflow-hidden z-0"
         >
            <SwiperSlide>
               <div
                  className="h-full"
                  style={{
                     background: `url("${cartoon}")`,
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center",
                  }}
               >
                  <div className="flex justify-center items-center flex-col h-full bg-sky-200 bg-opacity-50">
                     <h1 className="text-3xl md:text-5xl text-white text-center">
                        Cartoon Drawing
                     </h1>
                     <p className="text-xl text-white mt-3 md:mt-5 text-center">
                        Learn to draw carttons.
                     </p>
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div
                  className="h-full"
                  style={{
                     background: `url("${doodle}")`,
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center",
                  }}
               >
                  <div className="flex justify-center items-center flex-col h-full bg-sky-200 bg-opacity-50">
                     <h1 className="text-3xl md:text-5xl text-white text-center">
                        Doodle Drawing
                     </h1>
                     <p className="text-xl text-white mt-3 md:mt-5 text-center">
                        Learn to draw doodles.
                     </p>
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div
                  className="h-full"
                  style={{
                     background: `url("${sketch}")`,
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center",
                  }}
               >
                  <div className="flex justify-center items-center flex-col h-full bg-sky-200 bg-opacity-50">
                     <h1 className="text-3xl md:text-5xl text-white text-center">
                        Sketch Drawing
                     </h1>
                     <p className="text-xl text-white mt-3 md:mt-5 text-center">
                        Learn to draw Sketch.
                     </p>
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide>
               <div
                  className="h-full"
                  style={{
                     background: `url("${landscape}")`,
                     backgroundRepeat: "no-repeat",
                     backgroundPosition: "center",
                  }}
               >
                  <div className="flex justify-center items-center flex-col h-full bg-sky-200 bg-opacity-50">
                     <h1 className="text-3xl md:text-5xl text-white text-center">
                        Landscape Drawing
                     </h1>
                     <p className="text-xl text-white mt-3 md:mt-5 text-center">
                        Learn to draw Landscape.
                     </p>
                  </div>
               </div>
            </SwiperSlide>
         </Swiper>
      </div>
   );
};

export default Slider;
