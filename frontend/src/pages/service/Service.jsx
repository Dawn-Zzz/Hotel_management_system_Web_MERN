import React from "react";
import Banner from "../../components/banner/Banner";
import ServiceTag from "../../components/serviceTag/ServiceTag";

const Service = () => {
    return (
        <div>
            <Banner
                title="Services"
                des="EXPERIENCE LUXURY AND COMFORT AT OUR HOTEL."
            />
            Service
            <ServiceTag reverse={false} />
        </div>
    );
};

export default Service;
