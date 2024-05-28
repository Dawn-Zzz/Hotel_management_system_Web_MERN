import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { viewListRoomType } from "../../../service/roomTypeService";
import {
  createNewBooking,
  viewListFreeRoom,
} from "../../../service/bookingService";
import toast from "react-hot-toast";

const AddRegistration = () => {
  const nav = useNavigate();
  const [booking, setBooking] = useState({
    phoneNumber: "",
    checkin: "",
    checkout: "",
    roomBookings: [],
  });
  const [rooms, setRooms] = useState([]);
  const [roomTypes, setRoomTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [choosenRoomType, setChoosenRoomType] = useState("");
  const [choosenRoom, setChoosenRoom] = useState("");
  const [clientQuantity, setClientQuantity] = useState("");

  const today = new Date().toISOString().split("T")[0];

  const createData = async () => {
    console.log(booking);
    try {
      setIsLoading(true);
      const data = await createNewBooking(booking);
      console.log(data);
      if (data?.code === 0) {
        toast.success(data.message);
        nav("/admin/registration");
      } else {
        toast.error(data.message);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getNextDay = (date) => {
    if (!date) return "";
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split("T")[0];
  };

  const handleCheckin = (e) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      checkin: e.target.value,
      checkout: getNextDay(e.target.value),
    }));
  };

  useEffect(() => {
    if (booking.checkin) {
      const nextDay = getNextDay(booking.checkin);
      setBooking((prevBooking) => ({
        ...prevBooking,
        checkout: nextDay,
      }));
    }
  }, [booking.checkin]);

  useEffect(() => {
    if (booking.checkin && booking.checkout) {
      getRooms();
      getRoomTypes();
    }
  }, [booking.checkin, booking.checkout]);

  const getRooms = async () => {
    try {
      setIsLoading(true);
      const data = await viewListFreeRoom(booking.checkin, booking.checkout);
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
  const handleSubmit = () => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      roomBookings: [
        ...prevBooking.roomBookings,
        { room: choosenRoom, headcount: clientQuantity },
      ],
    }));
    console.log("booking", booking);
    setModal(false); // Close the modal after submission
    // Reset the form fields if needed
    setChoosenRoomType("");
    setChoosenRoom("");
    setClientQuantity("");
  };

  const handleDelete = (index) => {
    setBooking((prevBooking) => ({
      ...prevBooking,
      roomBookings: prevBooking.roomBookings.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking({
      ...booking,
      [name]: value,
    });
  };

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
                setChoosenRoomType("");
                setChoosenRoom("");
                setClientQuantity("");
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
                  value={choosenRoomType}
                  onChange={(e) => {
                    setChoosenRoomType(e.target.value);
                  }}
                >
                  <option disabled hidden value="">
                    Choose RoomType
                  </option>
                  {roomTypes.map((roomType) => {
                    return (
                      <option key={roomType._id} value={roomType._id}>
                        {roomType.name}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className=" mb-4">
                <p className="text-gray-500 mb-2">Room</p>
                <select
                  className="select select-bordered w-full text-gray-500"
                  value={choosenRoom}
                  onChange={(e) => {
                    setChoosenRoom(e.target.value);
                  }}
                >
                  <option disabled hidden value="">
                    Choose Room
                  </option>
                  {roomTypes.map((roomType) => {
                    return roomType._id === choosenRoomType
                      ? rooms
                          .filter((room) => room.roomType === roomType._id)
                          .filter(
                            (room) =>
                              !booking.roomBookings.some(
                                (booking) => booking.room === room._id
                              )
                          )
                          .map((room) => (
                            <option key={room._id} value={room._id}>
                              {room.roomNumber}
                            </option>
                          ))
                      : "";
                  })}
                </select>
              </div>
              <div className=" mb-4">
                <p className="text-gray-500 mb-2">Client Quantity</p>
                <select
                  className="select select-bordered w-full text-gray-500"
                  value={clientQuantity}
                  onChange={(e) => {
                    setClientQuantity(e.target.value);
                  }}
                >
                  <option disabled hidden value="">
                    Choose Client Quantity
                  </option>
                  {roomTypes.map((roomType) =>
                    roomType._id === choosenRoomType
                      ? (() => {
                          const options = [];
                          for (let i = 1; i <= roomType.capacity; i++) {
                            options.push(<option>{i}</option>);
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
                className={`py-2 px-16 text-white ${
                  choosenRoomType && choosenRoom && clientQuantity
                    ? "bg-black"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={handleSubmit}
                disabled={!choosenRoomType || !choosenRoom || !clientQuantity}
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
              min={today}
            />
          </div>
          <div className="py-2 text-gray-500">
            <p className="text-gray-500 z-10">Check-out Date</p>
            <input
              type="date"
              className={`w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2 ${
                !booking.checkin ? "opacity-50 cursor-default" : ""
              }`}
              onChange={(e) => {
                setBooking((prevBooking) => ({
                  ...prevBooking,
                  checkout: e.target.value,
                }));
              }}
              onClick={(e) => {
                if (!booking.checkin) {
                  e.preventDefault();
                }
              }}
              min={getNextDay(booking.checkin)}
              value={booking.checkout}
            />
          </div>
          <div className="py-2 text-gray-500">
            <p className="text-gray-500">Phone Number</p>
            <input
              type="text"
              name="phoneNumber"
              value={booking.phoneNumber}
              onChange={handleChange}
              className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
            />
          </div>
          <div className="py-2 text-gray-500 flex flex-col w-3/4">
            <p className="text-gray-500 my-2">Rooms</p>
            <table className="border border-gray-300">
              <tr className="border border-gray-300">
                <th className="py-4">Room Type</th>
                <th> Room Number</th>
                <th>Quantity</th>
                <th></th>
              </tr>
              {booking.roomBookings
                ? booking.roomBookings.map((roombooking, index) => {
                    const room = rooms.find(
                      (room) => room._id === roombooking.room
                    );
                    if (!room) return null;

                    const roomType = roomTypes.find(
                      (roomtype) => roomtype._id === room.roomType
                    );
                    return (
                      <tr key={index} className="">
                        <td className="text-center py-3">
                          {roomType ? roomType.name : ""}
                        </td>
                        <td className="text-center">
                          {roomType ? room.roomNumber : ""}
                        </td>
                        <td className="text-center">{roombooking.headcount}</td>
                        <td className="text-center">
                          <button
                            className="text-red-700 bg-red-200 py-1 px-4 rounded-full mr-2 text-center"
                            onClick={() => {
                              handleDelete(index);
                            }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </table>
            <button
              className={`border-indigo-400 border p-2 text-indigo-600 rounded-lg mt-4 ${
                !booking.checkout ? " cursor-default" : ""
              }`}
              onClick={(e) => {
                if (!booking.checkout) {
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
            <button
              onClick={() => {
                createData();
              }}
              className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
            >
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
