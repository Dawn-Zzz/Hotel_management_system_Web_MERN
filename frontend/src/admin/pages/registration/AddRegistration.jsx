import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewListRoom } from "../../../service/roomService";
import { viewListRoomType } from "../../../service/roomTypeService";

const AddRegistration = () => {
    const [rooms, setRooms] = useState([]);
    const [roomTypes, setRoomTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [modal, setModal] = useState(false);
    const [choosenRoomType, setChoosenRoomType] = useState("");
    const [choosenRoom, setChoosenRoom] = useState("");
    const [clientQuantity, setClientQuantity] = useState("");

    const today = new Date().toISOString().split("T")[0];

    const getNextDay = (date) => {
        if (!date) return "";
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.toISOString().split("T")[0];
    };

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

    useEffect(() => {
        getData();
        getRoomTypes();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewListRoom(1);
            console.log(data);
            if (data?.code === 0) {
                setRooms(data?.data);
            } else {
                setRooms([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    const getRoomTypes = async () => {
        try {
            const data = await viewListRoomType(1);
            console.log(data);
            if (data?.code === 0) {
                setRoomTypes(data?.data);
            } else {
                setRoomTypes([]);
            }
        } catch (error) {
            console.error(error);
        }
    };
    // console.log("room: ", rooms);
    // console.log("room type: ", roomTypes);
    return (
        <>
            <div
                className={` top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 z-60 flex items-center justify-center ${
                    modal ? "fixed" : "hidden"
                }`}
            >
                <div className="bg-white w-1/2 rounded-xl">
                    <div className=" flex flex-col items-center w-full relative p-8">
                        <div
                            className="absolute right-0 top-0 cursor-pointer px-4 py-2"
                            onClick={() => {
                                setModal(false);
                            }}
                        >
                            <i class="fa-regular fa-xmark p-2"></i>
                        </div>
                        <div className="text-[36px] text-gray-600 font-semibold my-4">
                            Add Room Form
                        </div>
                        <div className="w-full">
                            <div className=" mb-4">
                                <p className="text-gray-500 mb-2">Room Type</p>
                                <select
                                    className="select select-bordered w-full text-gray-500"
                                    onChange={(e) => {
                                        setChoosenRoomType(e.target.value);
                                    }}
                                >
                                    <option disabled selected>
                                        Choose RoomType
                                    </option>
                                    {roomTypes.map((roomType) => {
                                        return <option>{roomType.name}</option>;
                                    })}
                                </select>
                            </div>
                            <div className=" mb-4">
                                <p className="text-gray-500 mb-2">Room</p>
                                <select
                                    className="select select-bordered w-full text-gray-500"
                                    onChange={(e) => {
                                        setChoosenRoom(e.target.value);
                                    }}
                                >
                                    <option disabled selected>
                                        Choose Room
                                    </option>
                                    {roomTypes.map((roomType) => {
                                        return roomType.name === choosenRoomType
                                            ? rooms
                                                  .filter(
                                                      (room) =>
                                                          room.roomType ===
                                                          roomType._id
                                                  )
                                                  .map((room) => (
                                                      <option>
                                                          {room.roomNumber}
                                                      </option>
                                                  ))
                                            : "";
                                    })}
                                </select>
                            </div>
                            <div className=" mb-4">
                                <p className="text-gray-500 mb-2">
                                    Client Quantity
                                </p>
                                <select
                                    className="select select-bordered w-full text-gray-500"
                                    onChange={(e) => {
                                        setClientQuantity(e.target.value);
                                    }}
                                >
                                    <option disabled selected>
                                        Choose Client Quantity
                                    </option>
                                    {roomTypes.map((roomType) =>
                                        roomType.name === choosenRoomType
                                            ? (() => {
                                                  const options = [];
                                                  for (
                                                      let i = 1;
                                                      i <= roomType.capacity;
                                                      i++
                                                  ) {
                                                      options.push(
                                                          <option>{i}</option>
                                                      );
                                                  }
                                                  return options;
                                              })()
                                            : ""
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                className="bg-black py-2 px-16 text-white"
                                onClick={() => {
                                    console.log("roomtype:", choosenRoomType);
                                    console.log("room:", choosenRoom);
                                    console.log("quantity:", clientQuantity);
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
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
                        <p className="text-gray-500 z-10">Check-out Date</p>
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
                                !checkout ? " cursor-default" : ""
                            }`}
                            onClick={(e) => {
                                if (!checkout) {
                                    e.preventDefault();
                                } else {
                                    setModal(true);
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
        </>
    );
};

export default AddRegistration;
