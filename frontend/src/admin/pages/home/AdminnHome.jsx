import React, { useState } from "react";
import Loading from "../../../components/loading/Loading";

const AdminHome = () => {
    const [isLoading, setIsLoading] = useState("");
    return isLoading ? (
        <Loading />
    ) : (
        <div>
            <div className="text-[40px] font-semibold text-gray-600 mb-8">
                Dashboard
            </div>
        </div>
    );
};

export default AdminHome;
