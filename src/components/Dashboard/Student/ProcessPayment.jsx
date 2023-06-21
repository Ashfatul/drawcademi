import { useEffect, useState } from "react";
import SectionHeader from "../../SectionHeader/SectionHeader";
import axiosFetch from "../../../utility/axios";
import { useParams } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Loader from "../../Loader/Loader";
const stripePromise = loadStripe(
   `${import.meta.env.VITE_PUBLISHABLE_KEY_STRIPE}`
);

const ProcessPayment = () => {
   const [paymentOf, setPaymentOf] = useState({});
   const [loading, setLoading] = useState(false);

   const { id } = useParams();
   useEffect(() => {
      setLoading(true);
      axiosFetch.get(`/payment-of/${id}`).then((res) => {
         setPaymentOf(res.data);
         setLoading(false);
      });
   }, [id]);
   return (
      <div>
         <SectionHeader
            title="Process Payment"
            subtitle="Complete payment to enroll in this class"
         />
         {loading ? (
            <Loader />
         ) : (
            <div className="">
               <div className="product-info text-center text-lg mb-10 w-fit mx-auto">
                  <p className="text-2xl">
                     Paying For :{" "}
                     <span className="text-sky-500">
                        {paymentOf?.classItem?.classTitle}
                     </span>
                  </p>
                  <p>
                     Instructor:{" "}
                     <span className="text-sky-500">
                        {paymentOf?.classItem?.instructorName}
                     </span>
                  </p>
                  <p>
                     Email:{" "}
                     <span className="text-sky-500">
                        {paymentOf?.classItem?.instructorEmail}
                     </span>
                  </p>
                  <p>
                     Available Seats:{" "}
                     <span className="text-sky-500">
                        {paymentOf?.classItem?.availableSeats}
                     </span>
                  </p>
                  <p>
                     Enrolled Students:{" "}
                     <span className="text-sky-500">
                        {paymentOf?.classItem?.enrolled_student}
                     </span>
                  </p>
                  <p className="text-2xl">
                     Pay:{" "}
                     <span className="text-sky-500">
                        ${paymentOf?.classItem?.price}
                     </span>
                  </p>
               </div>
               <div className="payment-form mb-20">
                  <div className="form-container bg-base-200 rounded-lg p-10 max-w-screen-sm mx-auto">
                     <h1 className="text-2xl mb-10">Purchase Class</h1>
                     <Elements stripe={stripePromise} className="max-w-full">
                        <CheckOutForm
                           amount={paymentOf?.classItem?.price}
                           payment={paymentOf}
                           id={paymentOf?.classItem?._id}
                        />
                     </Elements>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ProcessPayment;
