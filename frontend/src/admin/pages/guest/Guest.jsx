import React from "react";
import { Link } from "react-router-dom";

const Guest = () => {
    return (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 mb-8">
                Guest List
            </div>
            <Link
                to="/admin/guest/add"
                className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
            >
                Add new{" "}
            </Link>
            <table className="w-full text-left mt-6">
                <tr>
                    <th className="text-gray-600 font-medium">Guest Name</th>
                    <th className="text-gray-600 font-medium">Date Of Birth</th>
                    <th className="text-gray-600 font-medium">Phone Number</th>
                    <th className="text-gray-600 font-medium">ID Number</th>
                    <th className="text-gray-600 font-medium">
                        Guest Categories
                    </th>
                    <th className="text-gray-600 font-medium">Action</th>
                </tr>
                <tr></tr>
            </table>
        </div>
    );
};

export default Guest;
