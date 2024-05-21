import React from "react";

const ServiceTag = ({ reverse, thumb, title, name, des }) => {
    return (
        <div className="flex">
            <div>
                <img src={thumb} alt="" />
            </div>
            <div>
                <p>{title}</p>
                <p>{name}</p>
                <p>{des}</p>
                <button>Learn more</button>
            </div>
        </div>
    );
};

export default ServiceTag;
