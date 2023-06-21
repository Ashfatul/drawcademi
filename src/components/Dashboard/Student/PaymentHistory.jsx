import { Helmet } from "react-helmet-async";
import SectionHeader from "../../SectionHeader/SectionHeader";
import { useContext, useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import PaymentHistoryRow from "./PaymentHistoryRow";
import axiosFetch from "../../../utility/axios";
import { AuthContext } from "../../../providers/AuthProvider";

const PaymentHistory = () => {
   const [isLoading, setIsLoading] = useState(false);
   const [history, setHistoty] = useState([]);
   const { user } = useContext(AuthContext);

   useEffect(() => {
      setIsLoading(true);
      axiosFetch.get(`/payment-history/${user?.uid}`).then((res) => {
         setHistoty(res.data);
         setIsLoading(false);
      });
   }, [user]);
   return (
      <div>
         <Helmet>
            <title>Payment History | Student | DrawCademi</title>
         </Helmet>
         <SectionHeader
            title="Payment History"
            subtitle="Below is the list of purchase you make"
         />

         <div className="user-table overflow-x-auto mb-10">
            <div className="w-72 md:w-full">
               {isLoading ? (
                  <Loader />
               ) : (
                  <>
                     <i className="text-sm mb-3 text-right block">
                        *Payment history sorted by descending order.
                     </i>
                     <table className="table table-zebra mb-5">
                        <thead className="bg-sky-800 text-white hover:bg-sky-900 text-lg">
                           <tr>
                              <th>Class Info</th>
                              <th>Instructor Info</th>
                              <th>Payment info</th>
                           </tr>
                        </thead>
                        <tbody>
                           {history?.length < 1 ? (
                              <tr className="text-red-500 text-xl text-center">
                                 <td colSpan="4">No payment history found</td>
                              </tr>
                           ) : (
                              history?.map((h) => (
                                 <PaymentHistoryRow key={h._id} data={h} />
                              ))
                           )}
                        </tbody>
                     </table>
                  </>
               )}
            </div>
         </div>
      </div>
   );
};

export default PaymentHistory;
