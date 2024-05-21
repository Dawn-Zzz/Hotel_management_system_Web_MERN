const roomModel = require("../models/roomModel");

let add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.roomNumber || !data.roomType) {
      throw {
        code: 1,
        message: "Không được bỏ trống thông tin",
      };
    }
    // kiểm tra tên phòng đã tồn tại chưa
    let room = await roomModel.findOne({ roomNumber: data.roomNumber });

    if (room) {
      throw {
        code: 1,
        message: "Tên phòng đã tồn tại",
      };
    }

    room = await roomModel.create({
      roomNumber: data.roomNumber,
      status: "Phòng còn trống",
      isFree: true,
      roomType: data.roomType,
    });

    res.status(200).json({
      code: 0,
      message: "Tạo loại phòng thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Logout",
    });
  }
};

let viewListRoom = async (req, res) => {
  try {
    const currentPage = req.params.currentPage || 1;

    const count = await roomModel.countDocuments();

    const offset = 12 * (currentPage - 1);

    const room = await roomModel
      .find()
      .limit(12)
      .skip(offset)
      .sort({ createdAt: -1 });

    if (!room || room.length === 0) {
      throw {
        code: 1,
        message: "Không có data nào",
      };
    }

    res.status(200).json({
      code: 0,
      message: "Lấy dữ liệu thành công",
      count: count,
      data: room,
    });
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Lỗi: viewListRoom ",
    });
  }
};

module.exports = {
  add,
  // edit,
  // deleteRoomType,
  viewListRoom,
  // searchRoomType,
  // getById,
};