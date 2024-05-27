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
        <div>
            <div className="text-[40px] font-semibold text-gray-600 mb-8">
                Service List
            </div>
            <Link
                to="/admin/service/create"
                className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
            >
                Add new{" "}
            </Link>
            <table className="w-full text-left mt-6">
                <tr>
                    <th className="text-gray-600 font-medium">Service Name</th>
                    <th className="text-gray-600 font-medium">Service Price</th>
                    <th className="text-gray-600 font-medium text-center">
                        Action
                    </th>
                </tr>
                {data.map((service) => (
                    <tr key={service._id} className="border-b">
                        <td className="py-4 text-gray-500">{service.name}</td>
                        <td className="py-4 text-gray-500">{service.price}</td>
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
    );
};

export default Service;
