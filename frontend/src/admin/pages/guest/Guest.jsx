import React, { useEffect, useState } from "react";

import axios from "axios";
import { Link } from "react-router-dom";
import { viewListGuest } from "../../../service/guestService";
import Loading from "../../../components/loading/Loading";

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

    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="text-[40px] font-semibold text-gray-600 mb-8">
                Guest List
            </div>
            <Link
                to="/admin/guest/create"
                className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
            >
                Add new{" "}
            </Link>
            <table className="w-full text-left mt-6">
                <tr className="border-y">
                    <th className="text-gray-500 font-medium py-4">
                        Guest Name
                    </th>
                    <th className="text-gray-500 font-medium py-4">
                        Date Of Birth
                    </th>
                    <th className="text-gray-500 font-medium py-4">
                        Phone Number
                    </th>
                    <th className="text-gray-500 font-medium py-4">
                        Guest Categories
                    </th>
                    <th className="text-gray-500 font-medium text-center w-1/6">
                        Action
                    </th>
                </tr>

                {data.map((guest) => (
                    <tr key={guest._id} className="border-b">
                        <td className="py-4 text-gray-500">{guest.name}</td>
                        <td className="py-4 text-gray-500">
                            {new Date(guest.dateOfBirth).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-gray-500">
                            {guest.phoneNumber}
                        </td>
                        <td className="py-4 text-gray-500">
                            {guest.guestCategories}
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
                ))}
            </table>
        </div>
    );
};

export default Guest;
