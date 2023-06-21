/* eslint-disable react/prop-types */
import { useStripe, CardElement, useElements } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import toastr from "toastr";
import axiosFetch from "../../../utility/axios";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Loader from "../../Loader/Loader";
const CheckOutForm = ({ amount, payment, id }) => {
   const [error, setError] = useState();
   const stripe = useStripe();
   const elements = useElements();
   const [secret, setSecret] = useState("");
   const { user } = useContext(AuthContext);
   const [processing, setProcessing] = useState(false);
   const navigate = useNavigate();

   const [userData, setUserData] = useState({});

   useEffect(() => {
      axiosFetch.get(`/user/${user?.uid}`).then((res) => setUserData(res.data));
   }, [user]);

   useEffect(() => {
      if (amount) {
         axiosFetch.post("/payment-intent", { amount }).then((res) => {
            setSecret(res.data.clientSecret);
         });
      }
   }, [amount]);

   const handleSubmit = async (e) => {
      setProcessing(true);
      e.preventDefault();

      if (!stripe || !elements) {
         return;
      }
      const card = elements.getElement(CardElement);

      if (card == null) {
         return;
      }

      // eslint-disable-next-line no-unused-vars
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });

      if (error) {
         setError(error.message);
         toastr.error(error.message);
      }

      const { paymentIntent, error: err } = await stripe.confirmCardPayment(
         secret,
         {
            payment_method: {
               card: card,
               billing_details: {
                  name: userData?.name,
                  email: userData?.email,
               },
            },
         }
      );

      if (err) {
         setProcessing(false);
      }

      if (paymentIntent?.status === "succeeded") {
         toastr.success("payment successful");
         const transactionID = paymentIntent.id;
         const createdOn = paymentIntent.created;
         const paidAmount = paymentIntent.amount / 100;
         const data = { transactionID, status: "paid", createdOn, paidAmount };
         const paymentData = {
            paymentHistory: {
               authID: user?.uid,
               transactionID,
               status: "paid",
               createdOn,
               paidAmount,
               paymentOf: payment.classItem,
            },
         };
         try {
            await axiosFetch.post(`/payment`, paymentData);
            await axiosFetch.patch(
               `/student-classes/enrolled/${payment?._id}`,
               data
            );
            await axiosFetch.patch(`/updateSeats/${id}`);
         } catch (error) {
            toastr.error(error);
         }
         setProcessing(false);
         const to = `/dashboard/student/enrolled-classes/${user?.uid}`;
         navigate(to);
      }
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <div className="text-red-500 mb-5">{error}</div>
            {processing && <Loader height="h-fit" />}
            <CardElement
               className="bg-white p-5 rounded-md"
               options={{
                  style: {
                     base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                           color: "#aab7c4",
                        },
                     },
                     invalid: {
                        color: "#9e2146",
                     },
                  },
               }}
            />
            <button
               type="submit"
               className="btn w-full bg-sky-800 text-white hover:bg-sky-900 mt-5"
               disabled={!stripe || !secret || processing}
            >
               Make Payment
            </button>
         </form>
      </div>
   );
};

export default CheckOutForm;
