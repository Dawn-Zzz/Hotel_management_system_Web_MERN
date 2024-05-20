import React from "react";
import Banner from "../../components/banner/Banner";
import home_3 from "../../assets/images/home_3.jpg";
import home_4 from "../../assets/images/home_4.jpg";
import RoomTag from "../../components/roomTag/RoomTag";

const Room = () => {
    return (
        <div className="w-full bg-white flex flex-col items-center">
            <Banner title="Rooms" des="ROOM." />
            <div className="flex w-3/5 flex-wrap justify-between my-16">
                <RoomTag
                    img={home_3}
                    name="Family"
                    price="750000"
                    bed="2 Single Bed"
                />
                <RoomTag
                    img={home_3}
                    name="Family"
                    price="750000"
                    bed="2 Single Bed"
                />
                <RoomTag
                    img={home_3}
                    name="Family"
                    price="750000"
                    bed="2 Single Bed"
                />
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
