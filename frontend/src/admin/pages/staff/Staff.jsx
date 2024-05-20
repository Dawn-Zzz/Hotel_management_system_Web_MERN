import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewListStaff } from "../../../service/staffService";
import Loading from "../../../components/loading/Loading";

const Staff = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewListStaff(1);
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

    console.log(data[0]);
    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <div className="text-[40px] font-semibold text-gray-600 mb-8">
                Staff List
            </div>
            <Link
                to="/admin/addstaff"
                className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
            >
                Add new{" "}
            </Link>
            <table className="w-full text-left mt-6">
                <tr className="border-y">
                    <th className="text-gray-500 font-medium py-4">
                        Staff Name
                    </th>
                    <th className="text-gray-500 font-medium py-4">
                        Date Of Birth
                    </th>
                    <th className="text-gray-500 font-medium py-4">
                        Phone Number
                    </th>
                    <th className="text-gray-500 font-medium py-4">
                        ID Number
                    </th>
                    <th className="text-gray-500 font-medium py-4">
                        Job Title
                    </th>
                    <th className="text-gray-500 font-medium">Action</th>
                </tr>
                {data.map((staff) => (
                    <tr key={staff._id} className="border-b">
                        <td className="py-4 text-gray-500">{staff.name}</td>
                        <td className="py-4 text-gray-500">
                            {new Date(staff.dateOfBirth).toLocaleDateString()}
                        </td>
                        <td className="py-4 text-gray-500">
                            {staff.phoneNumber}
                        </td>
                        <td className="py-4 text-gray-500">{staff.IDnumber}</td>
                        <td className="py-4 text-gray-500">{staff.role}</td>
                        <td className="py-4 text-gray-500">
                            <Link
                                to={`/admin/staff/${staff._id}`}
                                className="text-indigo-600 hover:underline"
                            >
                                Edit
                            </Link>
                        </td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default Staff;
