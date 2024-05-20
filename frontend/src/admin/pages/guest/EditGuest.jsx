import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewGuest } from "../../../service/guestService";
import Loading from "../../../components/loading/Loading";

const EditGuest = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [guest, setGuest] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        IDnumber: "",
        dateOfBirth: "",
        guestCategories: "",
    });
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewGuest(id);
            console.log(data);
            // if (data?.code === 0) {
            setData(data);
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
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Edit Guest
            </div>
            <div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">ID Number</p>
                    <input
                        type="text"
                        value={data.IDnumber}
                        className="w-3/4 outline-none rounded-lg p-1 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Guest Name</p>
                    <input
                        type="text"
                        value={data.name}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Guest Category</p>
                    <select
                        name=""
                        id=""
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                        value={data.guestCategories}
                    >
                        <option value="Normal">Normal</option>
                        <option value="Vip">Vip</option>
                    </select>
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Date Of Birth</p>
                    <input
                        type="date"
                        value={data.dateOfBirth}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Phone Number</p>
                    <input
                        type="text"
                        value={data.phoneNumber}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="flex flex-col">
                    <button className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20">
                        Submit
                    </button>
                    <Link
                        to="/admin/guest"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EditGuest;
