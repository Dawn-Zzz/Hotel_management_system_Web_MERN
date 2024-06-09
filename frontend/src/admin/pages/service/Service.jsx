import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewListService } from "../../../service/serviceService";
import Loading from "../../../components/loading/Loading";

const Service = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewListService(1);
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
            <div className="flex justify-between items-center mb-4">
                <div className="text-[40px] font-semibold text-gray-600">
                    Service List
                </div>
                <div>
                    <Link
                        to="/admin/service/create"
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
                            Service Name
                        </th>
                        <th className="text-gray-600 font-medium">
                            Service Price
                        </th>
                        <th className="text-gray-600 font-medium text-center">
                            Action
                        </th>
                    </tr>
                    {data.map((service) => (
                        <tr key={service._id} className="border">
                            <td className="py-4 text-gray-500 pl-4">
                                {service.name}
                            </td>
                            <td className="py-4 text-gray-500">
                                {service.price}
                            </td>
                            <td className="py-4 text-gray-500 text-center">
                                <Link
                                    to={`/admin/service/edit/${service._id}`}
                                    className="text-purple-700 bg-purple-200 py-1 px-4 rounded-full mr-2"
                                >
                                    Edit
                                </Link>
                                <Link
                                    to={`/admin/service/${service._id}`}
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

export default Service;
