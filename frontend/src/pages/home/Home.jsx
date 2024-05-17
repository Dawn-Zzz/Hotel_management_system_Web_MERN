import React from "react";
import Banner from "../../components/banner/Banner";
import home_1 from "../../assets/images/home_1.jpg";
import home_2 from "../../assets/images/home_2.jpg";
import home_3 from "../../assets/images/home_3.jpg";
import home_4 from "../../assets/images/home_4.jpg";
import home_5 from "../../assets/images/home_5.jpg";

const Home = () => {
    return (
        <div className="w-full bg-white flex flex-col items-center">
            <Banner title="A Best Place To Stay" des="BOUTIQUE HOTEL." />
            <div className="flex justify-center bg-slate-200">
                <div className="w-2/3 flex justify-between items-center mt-14 mb-40">
                    <div className="w-1/3">
                        <p className="text-[52px] font-serif font-semibold">
                            Welcome!
                        </p>
                        <p className="text-gray-600">
                            Far far away, behind the word mountains, far from
                            the countries Vokalia and Consonantia, there live
                            the blind texts. Separated they live in
                            Bookmarksgrove right at the coast of the Semantics,
                            a large language ocean.
                        </p>
                        <div className="mt-8">
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-full">
                                Learn more
                            </button>
                            <button className="text-blue-600 ml-12 font-semibold">
                                SEE VIDEO
                            </button>
                        </div>
                    </div>
                    <div className="w-3/5 relative">
                        <div className="">
                            <img
                                src={home_1}
                                alt=""
                                className="w-full rounded-lg"
                            />
                            <img
                                src={home_2}
                                alt=""
                                className="absolute rounded-full w-60 h-60 right-0 border-8 -translate-y-2/3 translate-x-1/3"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col items-center my-24">
                <p className="text-[52px] font-serif font-semibold">
                    Room & Suites
                </p>
                <p className="text-gray-600 w-2/5 mb-12">
                    Far far away, behind the word mountains, far from the
                    countries Vokalia and Consonantia, there live the blind
                    texts. Separated they live in Bookmarksgrove right at the
                    coast of the Semantics, a large language ocean.
                </p>
                <div className="flex w-3/4 justify-between">
                    <img src={home_3} alt="" className="w-1/3 mx-3 shadow-xl" />
                    <img src={home_4} alt="" className="w-1/3 mx-3 shadow-xl" />
                    <img src={home_5} alt="" className="w-1/3 mx-3 shadow-xl" />
                </div>
            </div>
        </div>
    );
};

export default Home;
