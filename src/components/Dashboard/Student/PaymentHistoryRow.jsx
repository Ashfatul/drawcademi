/* eslint-disable react/prop-types */
const PaymentHistoryRow = ({ data }) => {
  const unixTimestamp = data?.createdOn;
  const date = new Date(unixTimestamp * 1000);
  const regularTime = date.toLocaleString(); // Convert to local time format

  console.log(regularTime);

  return (
    <tr>
      <td>
        <h2 className="text-lg">{data?.paymentOf?.classTitle}</h2>
        <p>{regularTime}</p>
      </td>
      <td>
        <p>{data?.paymentOf?.instructorName}</p>
        <p>{data?.paymentOf?.instructorEmail}</p>
      </td>
      <td>
        <p>Status: {data?.status}</p>
        <p>tnxID: {data?.transactionID}</p>
        <p>Price: ${data?.paidAmount}</p>
      </td>
    </tr>
  );
};

export default PaymentHistoryRow;
