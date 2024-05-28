import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewRoomtype } from "../../../service/roomTypeService";
import { viewRoom } from "../../../service/roomService";
import Loading from "../../../components/loading/Loading";
import { viewBooking } from "../../../service/bookingService";
import { viewGuest } from "../../../service/guestService";

const RegistrationDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [guest, setGuest] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getData();
    }, []);
    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewBooking(id);
            const guestData = await viewGuest(data.guest);
            console.log(data);
            // if (data?.code === 0) {
            setData(data);
            setGuest(guestData);
            console.log(guestData);
            // } else {
            //     setData([]);
            // }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    return isLoading ? (
        <Loading />
    ) : (
        <div className="h-[78vh]">
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Registration Form Detail
            </div>
            <div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Guest Name: </p>
                    <p className="text-gray-500">{guest.name}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Phone Number: </p>
                    <p className="text-gray-500">{guest.phoneNumber}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Registration Date: </p>
                    <p className="text-gray-500">
                        {new Date(data.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Check-In Date: </p>
                    <p className="text-gray-500">
                        {new Date(data.checkin).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Check-Out Date: </p>
                    <p className="text-gray-500">
                        {new Date(data.checkout).toLocaleDateString()}
                    </p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Room Status: </p>
                    <p className="text-gray-500">{data.roomInteraction}</p>
                </div>
                <div className="flex flex-col">
                    <Link
                        to="/admin/registration"
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20 text-center"
                    >
                        Ok
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegistrationDetail;
