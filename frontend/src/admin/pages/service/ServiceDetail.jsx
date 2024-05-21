import React, { useEffect, useState } from "react";
import Loading from "../../../components/loading/Loading";
import { Link, useParams } from "react-router-dom";
import { viewService } from "../../../service/serviceService";

const ServiceDetail = () => {
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
        <div className="h-[78vh]">
            <div className="text-[32px] font-semibold text-gray-600 pb-4 mb-4 border-b border-gray-300">
                Service Detail
            </div>
            <div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Service Name: </p>
                    <p className="text-gray-500">{data.name}</p>
                </div>
                <div className="flex py-3 border-b">
                    <p className="font-semibold mr-4">Service Price: </p>
                    <p className="text-gray-500">{data.price} VND</p>
                </div>
                <div className="flex flex-col">
                    <Link
                        to="/admin/service"
                        className="rounded-lg bg-indigo-600 text-white px-4 py-2 mt-4 w-20 text-center"
                    >
                        Ok
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
