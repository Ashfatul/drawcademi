import EnrollInfo from "../components/EnrollInfo/EnrollInfo";
import PopularClasses from "../components/Classes/PopularClasses";
import PopularInstructors from "../components/Instructors/PopularInstructors";
import Slider from "../components/Slider/Slider";
import { Fade, Slide } from "react-awesome-reveal";
import { Helmet } from "react-helmet-async";

const Home = () => {
   return (
      <main className="py-10">
         <Helmet>
            <title>Home | DrawCademi</title>
         </Helmet>
         <Fade>
            <Slider />
         </Fade>
         <Slide direction="right">
            <PopularClasses />
         </Slide>
         <Slide>
            <EnrollInfo />
         </Slide>
         <Fade>
            <PopularInstructors />
         </Fade>
      </main>
   );
};

export default Home;
