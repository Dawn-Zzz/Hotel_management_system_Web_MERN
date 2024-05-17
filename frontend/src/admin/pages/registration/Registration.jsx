import React from "react";
import { Link } from "react-router-dom";

const Registration = () => {
    return (
        <div>
            <div className="text-[40px] font-semibold text-gray-600 mb-8">
                Registration Form List
            </div>
            <div>
                <Link
                    to="/admin/addregistration"
                    className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
                >
                    Add new{" "}
                </Link>
                <div className="dropdown">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn m-1 border-indigo-600 text-indigo-600"
                    >
                        Room Status
                    </div>
                    <ul
                        tabIndex={0}
                        className="dropdown-content z-[1] menu shadow bg-base-100 rounded-md w-52 border-2"
                    >
                        <li>
                            <a>Item 1</a>
                        </li>
                        <li>
                            <a>Item 2</a>
                        </li>
                    </ul>
                </div>
            </div>
            <table className="w-full text-left mt-6">
                <tr>
                    <th className="text-gray-600 font-medium">Guest Name</th>
                    <th className="text-gray-600 font-medium">Phone Number</th>
                    <th className="text-gray-600 font-medium">Check-In Date</th>
                    <th className="text-gray-600 font-medium">
                        Check-Out Date
                    </th>
                    <th className="text-gray-600 font-medium">
                        Registration Date
                    </th>
                    <th className="text-gray-600 font-medium">Room Status</th>
                    <th className="text-gray-600 font-medium">Action</th>
                </tr>
                <tr></tr>
            </table>
        </div>
    );
};

export default Registration;
