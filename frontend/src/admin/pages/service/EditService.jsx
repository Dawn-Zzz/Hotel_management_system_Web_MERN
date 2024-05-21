import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { viewService } from "../../../service/serviceService";
import Loading from "../../../components/loading/Loading";

const EditService = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setIsLoading(true);
            const data = await viewService(id);
            console.log(data);
            // if (data?.code === 0) {
            setData(data);
            // } else {
            //     setData([]);
            // }
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };
    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Edit Service
            </div>
            <div>
                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Service Name</p>
                    <input
                        type="text"
                        name="IDnumber"
                        defaultValue={data.name}
                        // onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>

                <div className="py-2 text-gray-500">
                    <p className="text-gray-500">Service Price</p>
                    <input
                        type="text"
                        name="IDnumber"
                        defaultValue={data.price}
                        // onChange={handleChange}
                        className="w-3/4 outline-none rounded-lg p-2 border-gray-300 border mt-2"
                    />
                </div>
                <div className="flex flex-col">
                    <button
                        onClick={() => {
                            addData();
                        }}
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20"
                        // disabled={isLoading}
                    >
                        Create
                    </button>
                    <Link
                        to="/admin/service"
                        className="rounded-lg text-red-600 py-2 mt-4 w-32"
                    >
                        Back to list
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EditService;
