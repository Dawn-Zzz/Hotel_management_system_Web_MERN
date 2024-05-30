import React, { useState } from "react";
import Loading from "../../../components/loading/Loading";

const AdminHome = () => {
    const [isLoading, setIsLoading] = useState("");
    return isLoading ? (
        <Loading />
    ) : (
        <div className="min-h-[78vh]">
            <div className="text-[40px] font-semibold text-gray-600 mb-8">
                Dashboard
            </div>
        </div>
    );
};

export default AdminHome;
