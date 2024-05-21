import React from "react";
import { Link } from "react-router-dom";

const AddRoom = () => {
    return (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Add New Room
            </div>
            <div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Room Code</p>
                    <input
                        type="text"
                        name="IDnumber"
                        // value={guest.IDnumber}
                        // onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Room Category</p>
                    <select
                        name="guestCategories"
                        // value={guest.guestCategories}
                        // onChange={handleChange}
                        id=""
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    >
                        <option value="Family">Family</option>
                        <option value="Standard">Standard</option>
                        <option value="Superior">Superior</option>
                        <option value="Deluxe">Deluxe</option>
                        <option value="Suite">Suite</option>
                        <option value="Family Suite">Family Suite</option>
                    </select>
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            addData();
                        }}
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
                        // disabled={isLoading}
                    >
                        Create
                    </button>
                    <Link
                        to="/admin/rooms"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddRoom;
