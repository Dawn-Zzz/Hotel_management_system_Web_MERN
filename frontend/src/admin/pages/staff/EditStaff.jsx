import React, { useEffect, useState } from "react";
import { viewStaff } from "../../../service/staffService";
import { Link, useParams } from "react-router-dom";
import Loading from "../../../components/loading/Loading";

const EditStaff = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [staff, setStaff] = useState({
        IDnumber: "",
        name: "",
        dateOfBirth: "",
        role: "Nhân viên lễ tân",
        phoneNumber: "",
        username: "",
        password: "",
    });
    // console.log(id);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewStaff(id);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStaff({
            ...staff,
            [name]: value,
        });
    };
    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Add New Staff
            </div>
            <div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">ID Number</p>
                    <input
                        type="text"
                        name="IDnumber"
                        value={data.IDnumber}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-1 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Staff Name</p>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Date Of Birth</p>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={data.dateOfBirth}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Job Title</p>
                    <select
                        name="role"
                        value={data.role}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    >
                        <option value="Nhân viên lễ tân">
                            Nhân viên lễ tân
                        </option>
                        <option value="Nhân viên kinh doanh">
                            Nhân viên kinh doanh
                        </option>
                        <option value="Nhân viên kế toán">
                            Nhân viên kế toán
                        </option>
                    </select>
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Phone Number</p>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={data.phoneNumber}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Account</p>
                    <input
                        type="text"
                        name="username"
                        value={data.username}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Password</p>
                    <input
                        type="text"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            addData();
                        }}
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
                        disabled={isLoading}
                    >
                        Submit
                    </button>
                    <Link
                        to="/admin/staff"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EditStaff;
