import React from "react";
import { Link } from "react-router-dom";

const AddStaff = () => {
    return (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Add New Staff
            </div>
            <div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">ID Number</p>
                    <input
                        type="text"
                        className="w-3/4 outline-none rounded-lg p-1 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Staff Name</p>
                    <input
                        type="text"
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Date Of Birth</p>
                    <input
                        type="date"
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Job Title</p>
                    <select
                        name=""
                        id=""
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
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Account</p>
                    <input
                        type="text"
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Password</p>
                    <input
                        type="text"
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="flex flex-col">
                    <button className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20">
                        Create
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

export default AddStaff;
