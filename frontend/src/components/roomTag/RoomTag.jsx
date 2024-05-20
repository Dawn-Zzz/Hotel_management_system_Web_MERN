import React from "react";

const RoomTag = ({ img, name, price, bed }) => {
    return (
        <div className="w-[32%] shadow-2xl">
            <img src={img} alt="" />
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <p className="font-bold text-2xl">{name}</p>
                    <p className="p-2 bg-blue-400 text-white font-semibold">
                        {price}VND / night
                    </p>
                </div>
                <div className="flex my-4 text-sm">
                    <div className="mr-4">
                        <i class="text-blue-400 mr-1 fa-solid fa-bed"></i>
                        {bed}
                    </div>
                    <div className="mr-4">
                        <i class="text-blue-400 mr-1 fa-solid fa-bath"></i> 1
                        Bath
                    </div>
                    <div className="mr-4">
                        <i class="text-blue-400 mr-1 fa-solid fa-wifi"></i>
                        Wifi
                    </div>
                </div>
                <div className="flex justify-between items-center my-4">
                    <div>
                        <i class="fa-regular fa-house-user text-blue-400 mr-2"></i>
                        Room quantity
                    </div>
                    <select
                        name=""
                        id=""
                        className="border px-2 py-1 rounded-md"
                    >
                        <option value="">0 room</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default RoomTag;
