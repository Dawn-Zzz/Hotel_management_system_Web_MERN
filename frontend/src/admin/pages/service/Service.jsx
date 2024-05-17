import React from "react";
import { Link } from "react-router-dom";

const Service = () => {
    return (
        <div>
            <div className="text-[40px] font-semibold text-gray-600 mb-8">
                Service List
            </div>
            <Link
                to="/admin/addservice"
                className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
            >
                Add new{" "}
            </Link>
            <table className="w-full text-left mt-6">
                <tr>
                    <th className="text-gray-600 font-medium">Service Name</th>
                    <th className="text-gray-600 font-medium">Service Price</th>
                    <th className="text-gray-600 font-medium">Action</th>
                </tr>
                <tr></tr>
            </table>
        </div>
    );
};

export default Service;
