import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AddRegistration = () => {
    const today = new Date().toISOString().split("T")[0];
    const getNextDay = (date) => {
        if (!date) return "";
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.toISOString().split("T")[0];
    };

    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");

    const handleCheckin = (e) => {
        setCheckin(e.target.value);
        setCheckout(getNextDay(checkin));
    };

    useEffect(() => {
        if (checkin) {
            const nextDay = getNextDay(checkin);
            setCheckout(nextDay);
        }
    }, [checkin]);
    return (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Add New Registration Form
            </div>
            <div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Check-in Date</p>
                    <input
                        type="date"
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                        onChange={handleCheckin}
                        // defaultValue={today}
                        min={today}
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Check-out Date</p>
                    <input
                        type="date"
                        className={`w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2 ${
                            !checkin ? "opacity-50 cursor-default" : ""
                        }`}
                        onChange={(e) => {
                            setCheckout(e.target.value);
                        }}
                        onClick={(e) => {
                            if (!checkin) {
                                e.preventDefault();
                            }
                        }}
                        // defaultValue={getNextDay(checkin)}
                        min={getNextDay(checkin)}
                        value={checkout}
                    />
                </div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Phone Number</p>
                    <input
                        type="text"
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="py-2 text-gray-500 flex flex-col w-3/4">
                    <p className="text-gray-500 my-2">Rooms</p>
                    <table>
                        <tr className="border border-gray-300">
                            <th className="py-2">Room ID</th>
                            <th> Room Number</th>
                            <th>Quantity</th>
                        </tr>
                    </table>
                    <button
                        className={`border-indigo-400 border p-2 text-indigo-600 rounded-lg mt-4 ${
                            !checkout ? "opacity-50 cursor-default" : ""
                        }`}
                        onClick={(e) => {
                            if (!checkout) {
                                e.preventDefault();
                            } else {
                                console.log("hi");
                            }
                        }}
                    >
                        Add room
                    </button>
                </div>
                <div className="flex flex-col">
                    <button className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20">
                        Create
                    </button>
                    <Link
                        to="/admin/registration"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AddRegistration;
