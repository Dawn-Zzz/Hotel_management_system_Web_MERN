import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import thumb from "../../assets/images/thumbimg.png";

const BookingForm = () => {
  const [rooms, setRooms] = useState([]);
  const [bookedDate, setBookedDate] = useState({});
  let total = 0;
  useEffect(() => {
    const storedRoom = localStorage.getItem("roomStored");
    if (storedRoom) {
      setRooms(JSON.parse(storedRoom));
    }
    const storedBookedDate = localStorage.getItem("bookedDate");
    if (storedBookedDate) {
      setBookedDate(JSON.parse(storedBookedDate));
    }
  }, []);
  console.log("booked", bookedDate);
  return (
    <div className="bg-white min-h-screen w-screen">
      <div
        className={`navbar fixed top-0 flex justify-center z-40 text-black border-b transition-all px-4 bg-white bg-opacity-80 backdrop-blur-sm`}
      >
        <div className="">
          <Link className="btn btn-ghost text-2xl" to="/">
            MPP Hotel
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <img src={thumb} className="w-full" alt="" />
        <p className="text-[32px] font-bold mb-8">HOTEL BOOKING</p>
        <div className="w-1/2">
          <div className="w-full">
            <p>
              Phone Number
              <span className="text-red-600">*</span>
            </p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full mt-2"
            />
          </div>
          <div className="flex mt-8">
            <div className="w-1/2 mr-3">
              <p>
                Name
                <span className="text-red-600">*</span>
              </p>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full mt-2"
              />
            </div>
            <div className="w-1/2 ml-3">
              <p>
                Birthday
                <span className="text-red-600">*</span>
              </p>
              <input
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full mt-2"
              />
            </div>
          </div>
          {rooms.map((room) => {
            total = total + Number(room.value) * room.price;

            return room.value != "0" ? (
              <div className="mt-8 pb-8">
                <div className="w-full flex">
                  <p className="w-1/2">
                    Room Type:
                    <span className="font-semibold ml-2">{room.roomtype}</span>
                  </p>
                  <p className="w-1/2 ml-5">
                    Room Quantity:
                    <span className="font-semibold ml-2">{room.value}</span>
                  </p>
                </div>
                <div className="mt-4">
                  <p>
                    Room Detail:{" "}
                    <span className="font-semibold">
                      {room.bedQuantity} {room.bedType}
                    </span>
                  </p>
                </div>
                <div className="mt-4">
                  <p>
                    Price:{" "}
                    <span className="font-semibold">
                      {Number(room.value) * room.price}
                    </span>
                  </p>
                </div>
              </div>
            ) : (
              ""
            );
          })}
          <div className="pt-8 border-t border-gray-500">
            <p>
              Total: <span className="font-semibold">{total}</span>
            </p>
            <div className="flex w-full mt-4">
              <p className="w-1/2">
                Check-In:{" "}
                <span className="font-semibold">{bookedDate.checkin}</span>
              </p>
              <p className="w-1/2 ml-5">
                Check-Out:{" "}
                <span className="font-semibold">{bookedDate.checkout}</span>
              </p>
            </div>
          </div>
          <button className="bg-blue-500 text-white py-3 w-full mt-8 font-semibold">
            Book Now
          </button>
          <Link className=" text-red-600 text-center py-3 w-full mt-8 font-semibold">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
