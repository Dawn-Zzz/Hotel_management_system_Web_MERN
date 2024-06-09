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
    await billModel.findById({ _id: id }).then((bill) => res.json(bill));
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message,
    });
  }
};

const getRevenueByMonthYear = async (req, res) => {
  try {
    const { month, year } = req.params;
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0);

    const totalRevenue = await billModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate },
        },
      },
      {
        $group: {
          _id: null,
          totalRoomCharge: { $sum: "$roomCharge" }, // Tổng tiền phòng
          totalServiceCharge: { $sum: "$serviceCharge" }, // Tổng tiền dịch vụ
          totalRevenue: {
            $sum: { $sum: ["$roomCharge", "$serviceCharge"] },
          },
        },
      },
    ]);

    if (totalRevenue.length === 0 || !totalRevenue[0].totalRevenue) {
      // Trả về 0 nếu không có doanh thu
      return res.status(200).json({
        code: 0,
        message: "Không có doanh thu nào trong tháng và năm này",
        data: {
          totalRevenue: 0,
          totalRoomCharge: 0,
          totalServiceCharge: 0,
        },
      });
    }

    res.status(200).json({
      code: 0,
      message: "Lấy doanh thu thành công",
      data: {
        totalRevenue: totalRevenue[0].totalRevenue,
        totalRoomCharge: totalRevenue[0].totalRoomCharge,
        totalServiceCharge: totalRevenue[0].totalServiceCharge,
      },
    });
  } catch (error) {
    res.status(500).json({
      code: 1,
      message: "Đã có lỗi xảy ra khi lấy doanh thu",
    });
  }
};

module.exports = {
  viewListBill,
  getById,
  getRevenueByMonthYear,
};
