import React, { useEffect, useState } from "react";
import Banner from "../../components/banner/Banner";
import { searchBooking, viewListBooking } from "../../service/bookingService";
import { viewListGuest } from "../../service/guestService";
import { Link } from "react-router-dom";
import LoadingComponent from "../../components/loading/LoadingComponent";

const Search = () => {
    const [registrations, setRegistrations] = useState([]);
    const [guests, setGuests] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");

    useEffect(() => {
        getData();
        getGuest();
    }, [phoneNumber]);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await searchBooking(1, phoneNumber);
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

    console.log(registrations);

    const getGuest = async () => {
        try {
            // setIsLoading(true);
            const data = await viewListGuest(1);
            if (data?.code === 0) {
                setGuests(data?.data);
            } else {
                setGuests([]);
            }
            // setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="w-full bg-white flex flex-col items-center">
            <Banner title="Search" des="FINDING YOUR REGISTRATION FORM" />
            <div className="flex flex-col items-center my-24 w-3/4">
                <p className="text-[52px] font-serif font-semibold">
                    Registration
                </p>
                <div className="w-full">
                    <form
                        action=""
                        onSubmit={(e) => {
                            e.preventDefault();
                            console.log(phoneNumber);
                        }}
                        className="flex mt-4"
                    >
                        <input
                            type="text"
                            placeholder="Input your phone number"
                            className="border-2 outline-none px-4 py-2 w-full rounded-s-2xl"
                            onChange={(e) => {
                                setPhoneNumber(e.target.value);
                            }}
                            defaultValue={phoneNumber}
                            value={phoneNumber}
                        />
                        <button
                            className="border-2 border-l-0 hover:bg-gray-50 outline-none px-4 py-2 rounded-e-2xl"
                            onClick={() => {
                                setPhoneNumber("");
                            }}
                        >
                            <i class="fa-sharp fa-solid fa-xmark text-gray-500"></i>
                        </button>
                    </form>
                    {isLoading ? (
                        <LoadingComponent />
                    ) : registrations.length != 0 ? (
                        <table className="w-full text-left mt-6">
                            <thead>
                                <tr className="border bg-gray-100">
                                    <th className="text-gray-600 font-medium py-4 pl-6">
                                        Guest Name
                                    </th>
                                    <th className="text-gray-600 font-medium">
                                        Phone Number
                                    </th>
                                    <th className="text-gray-600 font-medium">
                                        Check-In Date
                                    </th>
                                    <th className="text-gray-600 font-medium">
                                        Check-Out Date
                                    </th>
                                    <th className="text-gray-600 font-medium">
                                        Registration Date
                                    </th>
                                    <th className="text-gray-600 font-medium">
                                        Room Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {registrations.map((registration) => {
                                    return (
                                        <tr
                                            className="border"
                                            key={registration._id}
                                        >
                                            <td className="py-4 text-gray-500 pl-6 font-semibold">
                                                {registration.guest.name}
                                            </td>
                                            <td className="py-4 text-gray-500">
                                                {registration.guest.phoneNumber}
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
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <div className="flex flex-col items-center mt-8">
                            <i class="fa-regular fa-cloud-xmark text-[40px]"></i>
                            <p className="font-semibold text-2xl">
                                Data not found
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Search;
