import React from "react";
import { Link } from "react-router-dom";

const RoomType = () => {
    return (
        <div>
            <div className="text-[40px] font-semibold text-gray-600 mb-8">
                Room Type List
            </div>
            <Link
                to="/admin/roomtype/add"
                className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
            >
                Add new{" "}
            </Link>
            <table className="w-full text-left mt-6">
                <tr>
                    <th className="text-gray-600 font-medium">
                        Room Category Name
                    </th>
                    <th className="text-gray-600 font-medium">Room Rate</th>
                    <th className="text-gray-600 font-medium">Capacity</th>
                    <th className="text-gray-600 font-medium">Action</th>
                </tr>
                <tr></tr>
            </table>
        </div>
    );
};

export default RoomType;
