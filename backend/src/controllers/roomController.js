const roomModel = require("../models/roomModel");

let add = async (req, res) => {
  try {
    const data = req.body;
    if (!data.numberRoom || !data.status || !data.roomType) {
      throw {
        code: 1,
        message: "Không được bỏ trống thông tin",
      };
    }
    // kiểm tra tên loại phòng đã tồn tại chưa
    let roomType = await roomtypeModel.findOne({ name });

    if (roomType) {
      throw {
        code: 1,
        message: "Tên loại phòng đã tồn tại",
      };
    }

    service = await roomtypeModel.create({
      name,
      price,
      images,
      capacity,
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
