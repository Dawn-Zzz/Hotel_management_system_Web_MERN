import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../../components/loading/Loading";

const RoomDetail = () => {
    const [isLoading, setIsLoading] = useState(false);
    return isLoading ? (
        <Loading />
    ) : (
        <div className="h-[78vh]">
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Room Detail
            </div>
            <div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Room Status: </p>
                    <p className="text-gray-500"></p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Room Category: </p>
                    <p className="text-gray-500"></p>
                </div>
                <div className="flex flex-col">
                    <Link
                        to="/admin/rooms"
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20 text-center"
                    >
                        Ok
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RoomDetail;
