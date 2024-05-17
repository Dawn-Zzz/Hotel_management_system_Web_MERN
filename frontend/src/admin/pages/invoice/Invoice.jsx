import React from "react";

const Invoice = () => {
    return (
        <div>
            <div className="text-[40px] font-semibold text-gray-600">
                Invoice List
            </div>
            <table className="w-full text-left">
                <tr>
                    <th className="text-gray-600 font-medium">Invoice Code</th>
                    <th className="text-gray-600 font-medium">Guest Name</th>
                    <th className="text-gray-600 font-medium">Total Amount</th>
                    <th className="text-gray-600 font-medium">Staff Name</th>
                    <th className="text-gray-600 font-medium">Invoice Date</th>
                    <th className="text-gray-600 font-medium">Action</th>
                </tr>
                <tr></tr>
            </table>
        </div>
    );
};

export default Invoice;
