import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewBooking, viewListBooking } from "../../../service/bookingService";
import { viewGuest, viewListGuest } from "../../../service/guestService";

const Registration = () => {
    const [registrations, setRegistrations] = useState([]);
    const [guests, setGuests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
    console.log(registrations);
    return (
        <div>
            <div className="text-[40px] font-semibold text-gray-600 mb-4">
                Registration Form List
            </div>
            <div>
                <Link
                    to="/admin/addregistration"
                    className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
                >
                    Add new{" "}
                </Link>
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        className=" text-indigo-600 px-4 py-3 cursor-pointer font-bold"
                    >
                        Room Status
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu shadow bg-base-100 rounded-md w-52 border-2"
                    >
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </div>
            </div>
            <table className="w-full text-left mt-6">
                <tr className="border-y">
                    <th className="text-gray-600 font-medium py-4">
                        Guest Name
                    </th>
                    <th className="text-gray-600 font-medium">Phone Number</th>
                    <th className="text-gray-600 font-medium">Check-In Date</th>
                    <th className="text-gray-600 font-medium">
                        Check-Out Date
                    </th>
                    <th className="text-gray-600 font-medium">
                        Registration Date
                    </th>
                    <th className="text-gray-600 font-medium">Room Status</th>
                    <th className="text-gray-600 font-medium text-center">
                        Action
                    </th>
                </tr>
                {registrations.map((registration) => {
                    return guests.map((guest) =>
                        registration.guest == guest._id ? (
                            <tr className="border-b">
                                <td className="py-4 text-gray-500">
                                    {guest.name}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {guest.phoneNumber}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {new Date(
                                        registration.checkin
                                    ).toLocaleDateString()}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {new Date(
                                        registration.checkout
                                    ).toLocaleDateString()}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {new Date(
                                        registration.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td className="py-4 text-gray-500">
                                    {registration.roomInteraction}
                                </td>
                                <td className="py-4 text-gray-500 text-center">
                                    <Link
                                        to={`/admin/guest/edit/${guest._id}`}
                                        className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full mr-2"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        to={`/admin/guest/${guest._id}`}
                                        className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full"
                                    >
                                        Detail
                                    </Link>
                                </td>
                            </tr>
                        ) : (
                            ""
                        )
                    );
                })}
            </table>
        </div>
    );
};

export default Registration;
