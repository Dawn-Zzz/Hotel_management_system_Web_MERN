import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewListBooking } from "../../../service/bookingService";
import { viewListGuest } from "../../../service/guestService";
import Loading from "../../../components/loading/Loading";

const Registration = () => {
  const [registrations, setRegistrations] = useState([]);
  const [guests, setGuests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("Chưa nhận phòng"); // Default filter

  useEffect(() => {
    getData();
    getGuest();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await viewListBooking(1);
      if (data?.code === 0) {
        setRegistrations(data?.data);
      } else {
        setRegistrations([]);
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

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredRegistrations = registrations.filter(
    (registration) => registration.roomInteraction === filter
  );

  console.log(filteredRegistrations);
  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-[78vh]">
      <div className="text-[40px] font-semibold text-gray-600 mb-4">
        Registration Form List
      </div>
      <div>
        <Link
          to="/admin/registration/create"
          className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
        >
          Add new
        </Link>
        <div className="dropdown">
          <div
            tabIndex={0}
            className="text-indigo-600 px-4 py-3 cursor-pointer font-bold"
          >
            Room Status
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu shadow bg-base-100 rounded-md w-52 border-2"
          >
            <li onClick={() => handleFilterChange("Chưa nhận phòng")}>
              <a>Chưa nhận phòng</a>
            </li>
            <li onClick={() => handleFilterChange("Đã nhận phòng")}>
              <a>Đã nhận phòng</a>
            </li>
            <li onClick={() => handleFilterChange("Đã trả phòng")}>
              <a>Đã trả phòng</a>
            </li>
            <li onClick={() => handleFilterChange("Đã hủy phòng")}>
              <a>Đã hủy phòng</a>
            </li>
          </ul>
        </div>
      </div>
      <table className="w-full text-left mt-6">
        <thead>
          <tr className="border-y">
            <th className="text-gray-600 font-medium py-4">Guest Name</th>
            <th className="text-gray-600 font-medium">Phone Number</th>
            <th className="text-gray-600 font-medium">Check-In Date</th>
            <th className="text-gray-600 font-medium">Check-Out Date</th>
            <th className="text-gray-600 font-medium">Registration Date</th>
            <th className="text-gray-600 font-medium">Room Status</th>
            <th className="text-gray-600 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRegistrations.map((registration) => {
            const guest = guests.find((g) => g._id === registration.guest);
            return guest ? (
              <tr className="border-b" key={registration._id}>
                <td className="py-4 text-gray-500">{guest.name}</td>
                <td className="py-4 text-gray-500">{guest.phoneNumber}</td>
                <td className="py-4 text-gray-500">
                  {new Date(registration.checkin).toLocaleDateString()}
                </td>
                <td className="py-4 text-gray-500">
                  {new Date(registration.checkout).toLocaleDateString()}
                </td>
                <td className="py-4 text-gray-500">
                  {new Date(registration.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 text-gray-500">
                  {registration.roomInteraction}
                </td>
                <td className="py-4 text-gray-500 text-center">
                  {registration.roomInteraction === "Đã trả phòng" ||
                  registration.roomInteraction === "Đã hủy phòng" ? (
                    ""
                  ) : (
                    <Link
                      to={`/admin/registration/edit/${registration._id}`}
                      className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full mr-2"
                    >
                      Edit
                    </Link>
                  )}
                  <Link
                    to={`/admin/registration/${registration._id}`}
                    className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full"
                  >
                    Detail
                  </Link>
                </td>
              </tr>
            ) : null;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Registration;
