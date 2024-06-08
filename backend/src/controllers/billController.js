const billModel = require("../models/billModel");

let viewListBill = async (req, res) => {
    try {
        const currentPage = req.params.currentPage || 1;

        const count = await billModel.countDocuments();

        const offset = 12 * (currentPage - 1);

        const bill = await billModel
            .find()
            .limit(12)
            .skip(offset)
            .sort({ createdAt: -1 });

        if (!bill || bill.length === 0) {
            throw {
                code: 1,
                message: "Không có data nào",
            };
        }

        res.status(200).json({
            code: 0,
            message: "Lấy dự liệu thành công",
            count: count,
            data: bill,
        });
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message || "Lỗi: viewListBill",
        });
    }
};

let getById = async (req, res) => {
    try {
        const id = req.params.id;
        await billModel
            .findById({ _id: id })
            .then((bill) => res.json(bill));
    } catch (error) {
        res.status(200).json({
            code: error.code || 1,
            message: error.message,
        });
    }
};

module.exports = {
    viewListBill,
    getById,
};