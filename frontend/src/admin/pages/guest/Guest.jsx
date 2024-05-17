import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewListGuest } from "../../../service/guestService";

const Guest = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await viewListGuest(1);
      console.log(data);
      if (data?.code === 0) {
        setData(data?.data);
      } else {
        setData([]);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="text-[32px] font-semibold text-gray-600 mb-8">
        Guest List
      </div>
      <Link
        to="/admin/guest/add"
        className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
      >
        Add new{" "}
      </Link>
      <table className="w-full text-left mt-6">
        <tr>
          <th className="text-gray-600 font-medium">Guest Name</th>
          <th className="text-gray-600 font-medium">Date Of Birth</th>
          <th className="text-gray-600 font-medium">Phone Number</th>
          <th className="text-gray-600 font-medium">ID Number</th>
          <th className="text-gray-600 font-medium">Guest Categories</th>
          <th className="text-gray-600 font-medium">Action</th>
        </tr>
        <tr>
          {data.map((guest) => (
            <tr key={guest._id} className="border-b">
              <td className="py-2">{guest.name}</td>
              <td className="py-2">
                {new Date(guest.dateOfBirth).toLocaleDateString()}
              </td>
              <td className="py-2">{guest.phoneNumber}</td>
              <td className="py-2">{guest.IDnumber}</td>
              <td className="py-2">{guest.guestCategories}</td>
              <td className="py-2">
                <Link
                  to={`/admin/guest/edit/${guest._id}`}
                  className="text-indigo-600 hover:underline"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tr>
      </table>
    </div>
  );
};

export default Guest;
