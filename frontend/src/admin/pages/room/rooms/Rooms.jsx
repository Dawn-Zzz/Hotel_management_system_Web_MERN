import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { viewListRoom } from "../../../../service/roomService";
import Loading from "../../../../components/loading/Loading";

const Rooms = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await viewListRoom(1);
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

  return isLoading ? (
    <Loading />
  ) : (
    <div>
      <div className="text-[40px] font-semibold text-gray-600 mb-8">
        Room List
      </div>
      <div>
        <Link
          to="/admin/rooms/add"
          className="rounded-lg border bg-indigo-600 text-white px-4 py-3"
        >
          Add new{" "}
        </Link>
      </div>
      <div className="mt-4 flex flex-wrap">
        {data.map((room) => (
          <div className=" w-[24%] mt-4 bg-white rounded-lg border-l-4 border-[#1cc88a] mr-2">
            <div className="flex flex-col p-6">
              <div>
                <p className="uppercase font-semibold text-lg text-[#1cc88a]">
                  Family
                </p>
                <p className="font-semibold text-lg mt-4">{room.roomNumber}</p>
              </div>
              <div className="flex justify-end">
                <Link
                  to="/admin/rooms/detail"
                  className="text-white bg-[#1cc88a] py-2 px-6 rounded-full"
                >
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* <div className=" w-[24%] mt-4 bg-white rounded-lg border-l-4 border-[#1cc88a] mx-2">
          <div className="flex flex-col p-6">
            <div>
              <p className="uppercase font-semibold text-lg text-[#1cc88a]">
                Family
              </p>
              <p className="font-semibold text-lg mt-4">101</p>
            </div>
            <div className="flex justify-end">
              <Link
                to="/admin/rooms/detail"
                className="text-white bg-[#1cc88a] py-2 px-6 rounded-full"
              >
                Details
              </Link>
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
              <Link
                to="/admin/rooms/detail"
                className="text-white bg-[#1cc88a] py-2 px-6 rounded-full"
              >
                Details
              </Link>
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
              <Link
                to="/admin/rooms/detail"
                className="text-white bg-red-600 py-2 px-6 rounded-full"
              >
                Details
              </Link>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Rooms;
