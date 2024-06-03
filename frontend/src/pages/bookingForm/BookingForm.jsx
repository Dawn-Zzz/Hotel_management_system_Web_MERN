import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import thumb from "../../assets/images/thumbimg.png";
import { viewListRoomType } from "../../service/roomTypeService";
import { payment } from "../../service/paymentService";

const BookingForm = () => {
    const [rooms, setRooms] = useState([]);
    const [bookedDate, setBookedDate] = useState({});
    const [roomTypes, setRoomTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentLink, setPaymentLink] = useState("");
    const [paymentData, setPaymentData] = useState({ amount: 0 });
    const [total, setTotal] = useState(0);
    console.log(paymentData);
    useEffect(() => {
        const newTotal = rooms.reduce(
            (sum, room) => sum + Number(room.value) * room.price,
            0
        );
        setTotal(newTotal);
    }, [rooms]);

    useEffect(() => {
        getRoomType();
        // getPaymentLink();
    }, [paymentData]);

    useEffect(() => {
        setPaymentData({
            amount: total / 2,
        });
    }, [total]);
    console.log(paymentData);

    const getRoomType = async () => {
        try {
            setIsLoading(true);
            const data = await viewListRoomType(1);
            console.log(data);
            if (data?.code === 0) {
                setRoomTypes(data?.data);
            } else {
                setRoomTypes([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getPaymentLink = async () => {
        try {
            setIsLoading(true);
            const data = await payment(paymentData);
            console.log("đa", paymentData);
            console.log("đatttt", data);
            setPaymentLink(data.payUrl);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

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
                    <div className="flex mt-8 mb-16">
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
                        return room.value != "0" ? (
                            <div className="mt-8">
                                <div className="w-full flex">
                                    <p className="w-1/2">
                                        Room Type:
                                        <span className="font-semibold ml-2">
                                            {room.roomtype}
                                        </span>
                                    </p>
                                    <p className="w-1/2 ml-5">
                                        Room Quantity:
                                        <span className="font-semibold ml-2">
                                            {room.value}
                                        </span>
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
                                <div className="flex border-b border-gray-300 pb-8">
                                    {roomTypes.map((roomtype) =>
                                        roomtype.name === room.roomtype
                                            ? Array.from({
                                                  length: Number(room.value),
                                              }).map((_, i) => (
                                                  <div
                                                      key={i}
                                                      className=" mt-4 mr-4"
                                                  >
                                                      <p>Room {i + 1}</p>
                                                      <select
                                                          name=""
                                                          id=""
                                                          className="pr-16 pl-2 py-2 rounded-sm border mt-2"
                                                      >
                                                          {Array.from({
                                                              length: Number(
                                                                  roomtype.capacity
                                                              ),
                                                          }).map((_, i) => (
                                                              <option key={i}>
                                                                  {i + 1}
                                                              </option>
                                                          ))}
                                                      </select>
                                                  </div>
                                              ))
                                            : ""
                                    )}
                                </div>
                            </div>
                        ) : (
                            ""
                        );
                    })}
                    <div className="pt-8 mb-8">
                        <div className="flex w-full mb-4">
                            <p className="w-1/2">
                                Check-In:{" "}
                                <span className="font-semibold">
                                    {bookedDate.checkin}
                                </span>
                            </p>
                            <p className="w-1/2 ml-5">
                                Check-Out:{" "}
                                <span className="font-semibold">
                                    {bookedDate.checkout}
                                </span>
                            </p>
                        </div>
                        <p>
                            Total:{" "}
                            <span className="font-semibold">{total}</span>
                        </p>
                    </div>

                    <button
                        className="btn w-full bg-blue-500 hover:bg-blue-400 text-white"
                        onClick={() => {
                            getPaymentLink();
                            document.getElementById("my_modal_2").showModal();
                        }}
                    >
                        Book Now
                    </button>
                    <dialog id="my_modal_2" className="modal ">
                        <div className="modal-box flex flex-col items-center">
                            <h3 className="font-bold text-2xl">
                                Confirm Payment?
                            </h3>
                            <Link
                                className="btn bg-black hover:bg-gray-600 text-white py-3 w-1/3 mt-8 font-semibold block text-center text-base"
                                onClick={() => {}}
                                to={paymentLink}
                            >
                                Comfirm
                            </Link>
                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                    <div className="w-full flex justify-center mb-4">
                        <Link
                            className=" text-red-600 text-center py-3 mt-4 font-semibold"
                            to="/room"
                        >
                            Decline
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookingForm;
