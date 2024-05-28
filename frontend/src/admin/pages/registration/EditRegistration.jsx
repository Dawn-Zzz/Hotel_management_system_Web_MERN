import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewBooking } from "../../../service/bookingService";
import Loading from "../../../components/loading/Loading";
import { viewListService } from "../../../service/serviceService";

const EditRegistration = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [services, setServices] = useState([]);
    const [roomStatus, setRoomStatus] = useState("");
    const [choosenServiceName, setChoosenServiceName] = useState("");
    const [choosenServiceQuantity, setChoosenServiceQuantity] = useState("");
    const [serviceBooking, setServiceBooking] = useState([]);
    const [modal, setModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getData();
        getService();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewBooking(id);
            setData(data);
            data.roomInteraction === "Chưa nhận phòng"
                ? setRoomStatus("Đã nhận phòng")
                : setRoomStatus("Đã trả phòng");
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getService = async () => {
        try {
            setIsLoading(true);
            const data = await viewListService(1);
            setServices(data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = (index) => {
        setServiceBooking((prevService) =>
            prevService.filter((_, i) => i !== index)
        );
    };

    const handleSubmit = () => {
        let flag = false;

        setServiceBooking((prevService) => {
            return prevService
                .map((service) => {
                    if (choosenServiceName === service.name) {
                        flag = true;
                        return {
                            ...service,
                            quantity:
                                service.quantity +
                                parseInt(choosenServiceQuantity, 10),
                        };
                    }
                    return service;
                })
                .concat(
                    flag
                        ? []
                        : [
                              {
                                  name: choosenServiceName,
                                  quantity: parseInt(
                                      choosenServiceQuantity,
                                      10
                                  ),
                              },
                          ]
                );
        });
        setModal(false);
        setChoosenServiceName("");
        setChoosenServiceQuantity("");
    };

    return isLoading ? (
        <Loading />
    ) : (
        <>
            <div
                className={` top-0 bottom-0 right-0 left-0 bg-black bg-opacity-50 z-60 flex items-center justify-center ${
                    modal ? "fixed" : "hidden"
                }`}
            >
                <div className="bg-white w-1/2 rounded-xl animate-modalFaceIn">
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
                            Add Service Form
                        </div>
                        <div className="w-full">
                            <div className=" mb-4">
                                <p className="text-gray-500 mb-2">
                                    Service Name
                                </p>
                                <select
                                    className="select select-bordered w-full text-gray-500"
                                    value={choosenServiceName}
                                    onChange={(e) => {
                                        setChoosenServiceName(e.target.value);
                                    }}
                                >
                                    <option disabled hidden value=""></option>
                                    {services.data
                                        ? services.data.map((service) => (
                                              <option
                                                  key={service._id}
                                                  value={service._id}
                                              >
                                                  {service.name}
                                              </option>
                                          ))
                                        : ""}
                                </select>
                            </div>
                            <div className=" mb-4">
                                <p className="text-gray-500 mb-2">
                                    Service Quantity
                                </p>
                                <select
                                    className="select select-bordered w-full text-gray-500"
                                    value={choosenServiceQuantity}
                                    onChange={(e) => {
                                        setChoosenServiceQuantity(
                                            e.target.value
                                        );
                                    }}
                                >
                                    <option disabled hidden value=""></option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                </select>
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                className="bg-black py-2 px-16 text-white"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="h-[78vh]">
                <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                    Edit Registration Form
                </div>
                <div>
                    {data.roomInteraction === "Chưa nhận phòng" ? (
                        <div className="py-2 text-gray-500">
                            <p className="text-gray-500 mb-2">
                                Room Category Name
                            </p>
                            <select
                                className="select select-bordered w-full text-gray-500"
                                defaultValue="Đã nhận phòng"
                                onChange={(e) => {
                                    setRoomStatus(e.target.value);
                                }}
                            >
                                <option value="Đã nhận phòng">
                                    Đã nhận phòng
                                </option>
                                <option value="Đã hủy phòng">
                                    Đã hủy phòng
                                </option>
                            </select>
                        </div>
                    ) : (
                        <>
                            <div className="py-2 text-gray-500">
                                <p className="text-gray-500 mb-2">
                                    Room Status
                                </p>
                                <input
                                    className=" w-3/4 text-gray-500 border border-gray-300 rounded-lg py-2 px-4 "
                                    disabled
                                    value="Đã trả phòng"
                                />
                            </div>
                            <div className="py-2 text-gray-500 w-full">
                                <p className="text-gray-500 mb-2">Services</p>
                                <table className="border border-gray-300 w-3/4">
                                    <tr className="border border-gray-300">
                                        <th className="py-4">Service Name</th>
                                        <th>Service Quantity</th>
                                        <th></th>
                                    </tr>
                                    {serviceBooking
                                        ? serviceBooking.map(
                                              (booking, index) => (
                                                  <tr
                                                      key={index}
                                                      className="text-center"
                                                  >
                                                      <td className="py-3">
                                                          {services.data.map(
                                                              (service) => {
                                                                  return service._id ===
                                                                      booking.name
                                                                      ? service.name
                                                                      : "";
                                                              }
                                                          )}
                                                      </td>
                                                      <td>
                                                          {booking.quantity}
                                                      </td>
                                                      <td className="text-center">
                                                          <button
                                                              className="text-red-700 bg-red-200 py-1 px-4 rounded-full mr-2 text-center"
                                                              onClick={() => {
                                                                  handleDelete(
                                                                      index
                                                                  );
                                                              }}
                                                          >
                                                              Delete
                                                          </button>
                                                      </td>
                                                  </tr>
                                              )
                                          )
                                        : ""}
                                </table>
                                <button
                                    className={`border-indigo-400 border p-2 text-indigo-600 rounded-lg mt-4 w-3/4`}
                                    onClick={(e) => {
                                        setModal(true);
                                    }}
                                >
                                    Add Services
                                </button>
                            </div>
                        </>
                    )}
                    <div className="flex flex-col">
                        <Link
                            // to="/admin/registration"
                            className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20 text-center"
                            onClick={() => {
                                console.log(roomStatus);
                            }}
                        >
                            Submit
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditRegistration;
