import React, { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import Banner from "../../components/banner/Banner";
import home_3 from "../../assets/images/home_3.jpg";
import home_4 from "../../assets/images/home_4.jpg";
import RoomTag from "../../components/roomTag/RoomTag";
import { viewListRoomType } from "../../service/roomTypeService";
import { viewListRoom } from "../../service/roomService";

const Room = () => {
    const [data, setData] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [checkin, setCheckin] = useState("");
    const [checkout, setCheckout] = useState("");
    const [bedQuantity, setBedQuantity] = useState(0);
    const [bedType, setBedType] = useState("");

    const today = new Date().toISOString().split("T")[0];
    const getNextDay = (date) => {
        if (!date) return "";
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.toISOString().split("T")[0];
    };

    useEffect(() => {
        getData();
        getRooms();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewListRoomType(1);
            console.log(data);
            if (data?.code === 0) {
                setData(data?.data);
            } else {
                setData([]);
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getRooms = async () => {
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
            console.log(error);
        }
    };

    data.map((d) => {
        console.log(d);
    });

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
        data.map((roomtype) => {
            if (
                roomtype.name == "Family" ||
                roomtype.name == "Superior" ||
                roomtype.name == "Family Suite"
            ) {
                setBedQuantity(2);
            } else {
                setBedQuantity(1);
            }
            if (roomtype.name == "Family" || roomtype.name == "Superior") {
                setBedType("Single Bed");
            } else if (roomtype.name == "Suite") {
                setBedType("Big Twin Bed");
            } else {
                setBedType("Twin Bed");
            }
        });
    });
    return isLoading ? (
        <Loading />
    ) : (
        <div className="w-full bg-white flex flex-col items-center">
            <Banner title="Rooms" des="ROOM." />
            <div className="relative w-3/5 bg-white shadow-xl p-8 rounded-xl -top-[70px] flex items-end justify-between">
                <div className="w-2/5">
                    <p className="mb-2 font-semibold">Check In</p>
                    <input
                        type="date"
                        className="border-2 w-full px-4 py-2 rounded-md outline-none"
                        onChange={handleCheckin}
                        min={today}
                    />
                </div>
                <div className="w-2/5">
                    <p className="mb-2 font-semibold">Check Out</p>
                    <input
                        type="date"
                        className={`border-2 w-full px-4 py-2 rounded-md outline-none ${
                            !checkin ? "opacity-50 cursor-default" : ""
                        }`}
                        min={getNextDay(checkin)}
                        onClick={(e) => {
                            if (!checkin) {
                                e.preventDefault();
                            }
                        }}
                        onChange={(e) => {
                            setCheckout(e.target.value);
                        }}
                        value={checkout}
                    />
                </div>
                <button className="w-1/6 bg-blue-600 text-white h-3/5 rounded-lg">
                    Check
                </button>
            </div>
            <div className="flex w-3/5 flex-wrap justify-between mb-16">
                {data.map((roomtype) => {
                    let quantity = 0;
                    rooms.map((room) => {
                        room.roomType == roomtype._id ? quantity++ : "";
                    });
                    console.log(roomtype.name, ": ", quantity);
                    return (
                        <RoomTag
                            img={roomtype.images}
                            name={roomtype.name}
                            price={roomtype.price}
                            bed={bedQuantity + " " + bedType}
                            quantity={quantity}
                        />
                    );
                })}
            </div>
            <div className="flex flex-col items-center bg-slate-100 pt-12 pb-16 w-full">
                <p className="text-[52px] font-serif font-semibold">
                    Great Offers
                </p>
                <p className="text-gray-600 w-2/5 mb-12">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean.
                </p>
                <div className="w-3/5 h-[540px] m-auto py-4 px-2 flex flex-col items-center mb-48">
                    <div className="flex h-[350px] w-[1200px]">
                        <img src={home_3} alt="" className="h-full w-1/2" />
                        <div className="flex flex-col justify-center p-8 bg-white w-1/2">
                            <p className="text-[40px] font-semibold">
                                Family Room
                            </p>
                            <p className="my-8">
                                Far far away, behind the word mountains, far
                                from the countries Vokalia and Consonantia,
                                there live the blind texts. Separated they live
                                in Bookmarksgrove right at the coast of the
                                Semantics, a large language ocean.
                            </p>
                            <p className="text-indigo-600 font-bold text-2xl ">
                                750.000VND
                            </p>
                        </div>
                    </div>
                    <div className="flex h-[350px] w-[1200px]">
                        <div className="flex flex-col justify-center p-8 bg-white w-1/2">
                            <p className="text-[40px] font-semibold">
                                Suite Room
                            </p>
                            <p className="my-8">
                                Far far away, behind the word mountains, far
                                from the countries Vokalia and Consonantia,
                                there live the blind texts. Separated they live
                                in Bookmarksgrove right at the coast of the
                                Semantics, a large language ocean.
                            </p>
                            <p className="text-indigo-600 font-bold text-2xl ">
                                1.250.000VND
                            </p>
                        </div>
                        <img src={home_3} alt="" className="h-full w-1/2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Room;
