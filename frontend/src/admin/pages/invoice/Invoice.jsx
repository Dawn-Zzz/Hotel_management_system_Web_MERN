import React, { useEffect, useState } from "react";
import { viewListBill } from "../../../service/billService";
import Loading from "../../../components/loading/Loading";
import { Link } from "react-router-dom";
import { viewListGuest } from "../../../service/guestService";
import { viewListStaff } from "../../../service/staffService";

const Invoice = () => {
  const [bills, setBill] = useState([]);
  const [guests, setGuests] = useState([]);
  const [staffs, setStaffs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getBill();
    getGuest();
    getStaff();
  }, []);

  const getBill = async () => {
    try {
      setIsLoading(true);
      const data = await viewListBill(1);
      console.log(data);
      if (data?.code === 0) {
        setBill(data?.data);
      } else {
        setBill([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const getGuest = async () => {
    try {
      setIsLoading(true);
      const data = await viewListGuest(1);
      if (data?.code === 0) {
        setGuests(data?.data);
      } else {
        setGuests([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  const getStaff = async () => {
    try {
      setIsLoading(true);
      const data = await viewListStaff(1);
      if (data?.code === 0) {
        setStaffs(data?.data);
      } else {
        setStaffs([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };
  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-[78vh]">
      <div className="text-[40px] font-semibold text-gray-600">
        Invoice List
      </div>
      <table className="w-full text-left">
        <tr>
          {/* <th className="text-gray-600 font-medium">Invoice Code</th> */}
          <th className="text-gray-600 font-medium">Guest Name</th>
          <th className="text-gray-600 font-medium">Total Amount</th>
          <th className="text-gray-600 font-medium">Staff Name</th>
          <th className="text-gray-600 font-medium">Invoice Date</th>
          <th className="text-gray-600 font-medium">Action</th>
        </tr>
        {bills.map((bill) => {
          const guest = guests.find((g) => g._id === bill.guest);
          const staff = staffs.find((s) => s._id === bill.staff);
          return (
            <tr className="border-b" key={bill._id}>
              <td className="py-4 text-gray-500">{guest?.name}</td>
              <td className="py-4 text-gray-500">
                {bill.roomCharge + bill.serviceCharge}
              </td>
              <td className="py-4 text-gray-500">{staff?.name}</td>
              <td className="py-4 text-gray-500">
                {new Date(bill.createdAt).toLocaleDateString()}
              </td>
              <td className="py-4 text-gray-500 text-center">
                <Link
                  to={`/admin/invoice/${bill._id}`}
                  className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full"
                >
                  Detail
                </Link>
                <Link
                  to={`/admin/invoice/pdf/${bill._id}`}
                  className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full"
                >
                  PDF
                </Link>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Invoice;
