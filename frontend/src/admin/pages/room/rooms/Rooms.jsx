import React from "react";
import { Link } from "react-router-dom";

const Rooms = () => {
    return (
        <div>
            <div className="text-[40px] font-semibold text-gray-600 mb-8">
                Room List
            </div>
            <div>
                <Link
                    to="/admin/addregistration"
                    className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
                >
                    Add new{" "}
                </Link>
            </div>
            <div className="mt-4 flex flex-wrap">
                <div className=" w-[24%] mt-4 bg-white rounded-lg border-l-4 border-[#1cc88a] mr-2">
                    <div className="flex flex-col p-6">
                        <div>
                            <p className="uppercase font-semibold text-lg text-[#1cc88a]">
                                Family
                            </p>
                            <p className="font-semibold text-lg mt-4">101</p>
                        </div>
                        <div className="flex justify-end">
                            <button className="text-white bg-[#1cc88a] py-2 px-6 rounded-full">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
                <div className=" w-[24%] mt-4 bg-white rounded-lg border-l-4 border-[#1cc88a] mx-2">
                    <div className="flex flex-col p-6">
                        <div>
                            <p className="uppercase font-semibold text-lg text-[#1cc88a]">
                                Family
                            </p>
                            <p className="font-semibold text-lg mt-4">101</p>
                        </div>
                        <div className="flex justify-end">
                            <button className="text-white bg-[#1cc88a] py-2 px-6 rounded-full">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
                <div className=" w-[24%] mt-4 bg-white rounded-lg border-l-4 border-[#1cc88a] mx-2">
                    <div className="flex flex-col p-6">
                        <div>
                            <p className="uppercase font-semibold text-lg text-[#1cc88a]">
                                Family
                            </p>
                            <p className="font-semibold text-lg mt-4">101</p>
                        </div>
                        <div className="flex justify-end">
                            <button className="text-white bg-[#1cc88a] py-2 px-6 rounded-full">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
                <div className=" w-[24%] mt-4 bg-white rounded-lg border-l-4 border-red-600 ml-2">
                    <div className="flex flex-col p-6">
                        <div>
                            <p className="uppercase font-semibold text-lg text-red-600">
                                Family
                            </p>
                            <p className="font-semibold text-lg mt-4">101</p>
                        </div>
                        <div className="flex justify-end">
                            <button className="text-white bg-red-600 py-2 px-6 rounded-full">
                                Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rooms;
