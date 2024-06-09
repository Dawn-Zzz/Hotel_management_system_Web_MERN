import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewListRoomType } from "../../../../service/roomTypeService";
import Loading from "../../../../components/loading/Loading";

const RoomType = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewListRoomType(1);
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
        <div className="min-h-[78vh] pb-1">
            <div className="flex items-center justify-between mb-4">
                <div className="text-[40px] font-semibold text-gray-600">
                    Room Type List
                </div>
                <div>
                    <Link
                        to="/admin/roomtype/create"
                        className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
                    >
                        Add new{" "}
                    </Link>
                </div>
            </div>
            <div className="flex flex-col justify-between bg-white rounded-xl shadow-md">
                <div className="flex w-1/4 m-4">
                    <input
                        type="text"
                        className="border-2 outline-none px-4 py-2 w-full rounded-s-lg"
                        placeholder="Input phone number"
                    />
                    <button className="border-2 border-l-0 bg-white hover:bg-gray-50 outline-none px-4 rounded-e-lg">
                        <i class="fa-sharp fa-solid fa-xmark text-gray-500"></i>
                    </button>
                </div>
                <table className=" rounded-lg text-left m-4 mt-0 bg-white overflow-hidden">
                    <tr className="border bg-gray-100 rounded-lg overflow-hidden">
                        <th className="text-gray-600 font-medium py-4 pl-4">
                            Room Category Name
                        </th>
                        <th className="text-gray-600 font-medium">Room Rate</th>
                        <th className="text-gray-600 font-medium">Capacity</th>
                        <th className="text-gray-600 font-medium text-center">
                            Action
                        </th>
                    </tr>
                    {data.map((roomtype) => (
                        <tr key={roomtype._id} className="border">
                            <td className="py-4 text-gray-500 pl-5">
                                {roomtype.name}
                            </td>
                            <td className="py-4 text-gray-500">
                                {roomtype.price}
                            </td>
                            <td className="py-4 text-gray-500">
                                {roomtype.capacity}
                            </td>
                            <td className="py-4 text-gray-500 text-center">
                                <Link
                                    to={`/admin/roomtype/edit/${roomtype._id}`}
                                    className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full mr-2"
                                >
                                    Edit
                                </Link>
                                <Link
                                    to={`/admin/roomtype/${roomtype._id}`}
                                    className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full"
                                >
                                    Detail
                                </Link>
                            </td>
                        </tr>
                    ))}
                </table>
            </div>
        </div>
    );
};

export default RoomType;
