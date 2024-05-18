const jwtActions = require("../middleware/jwtActions");
const staffModel = require("../models/staffModel");
const bcrypt = require("bcrypt");

let login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      throw {
        code: 1,
        message: "Không được bỏ trống thông tin",
      };
    }

    let staff = await staffModel.findOne({ username });

    if (!staff) {
      throw {
        code: 1,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      };
    }

    if (!staff.password) {
      throw {
        code: 1,
        message: "Tài khoản hoặc mật khẩu không chính xác",
      };
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);

    // if (!isPasswordValid) {
    //   throw {
    //     code: 1,
    //     message: "Tài khoản hoặc mật khẩu không chính xác",
    //   };
    // }

    let payload = {
      id: user._id,
    };

    const token = jwtActions.createJWT(payload);

    // Lưu token vào cookie
    res.cookie("tokenAdmin", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 ngày
    });

    res.status(200).json({
      code: 0,
      message: "Đăng nhập thành công",
      _id: staff._id,
      name: staff.name,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Login",
    });
  }
};

let logout = async (req, res) => {
  try {
    // xóa cookie
    res.clearCookie("tokenAdmin");

    res.status(200).json({
      code: 0,
      message: "Đăng xuất thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Logout",
    });
  }
};

let refresh = async (req, res) => {
  try {
    const staffId = req.staffId;

    if (!staffId) {
      throw {
        code: 1,
        message: "Đã có lỗi xảy ra khi refresh: Không tìm thấy staffId",
      };
    }

    let staff = await staffModel.findById(staffId);

    if (!staff) {
      throw {
        code: 1,
        message: "Đã có lỗi xảy ra khi refresh: Không tìm thấy staff",
      };
    }

    res.status(200).json({
      code: 0,
      message: "Refresh thành công",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Refresh",
    });
  }
};

let add = async (req, res) => {
  try {
    const data = req.body;
    console.log(data.name);
    if (
      !data.name ||
      !data.username ||
      !data.password ||
      !data.phoneNumber ||
      !data.IDnumber ||
      !data.dateOfBirth ||
      !data.role
    ) {
      throw {
        code: 1,
        message: "Không được bỏ trống thông tin",
      };
    }
    // kiểm tra khách hàng đã tồn tại hay chưa
    let staff = await staffModel.findOne({ phoneNumber: data.phoneNumber });

    if (staff) {
      throw {
        code: 1,
        message: "Số điện thoại đã tồn tại",
      };
    }

    staff = await staffModel.findOne({ IDnumber: data.IDnumber });
    if (staff) {
      throw {
        code: 1,
        message: "Số CCCD đã tồn tại",
      };
    }

    staff = await staffModel.create({
      name: data.name,
      username: data.username,
      password: data.password,
      phoneNumber: data.phoneNumber,
      IDnumber: data.IDnumber,
      dateOfBirth: data.dateOfBirth,
      role: data.role,
    });

    res.status(200).json({
      code: 0,
      message: "Thêm nhân viên thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Logout",
    });
  }
};

let edit = async (req, res) => {
  try {
    const {
      id,
      name,
      username,
      password,
      phoneNumber,
      IDnumber,
      dateOfBirth,
      role,
    } = req.body;

    if (
      !name ||
      !username ||
      !password ||
      !phoneNumber ||
      !IDnumber ||
      !dateOfBirth ||
      !role
    ) {
      throw {
        code: 1,
        message: "Không được bỏ trống thông tin",
      };
    }

    let staff = await staffModel.findById(id);
    if (!staff) {
      throw {
        code: 1,
        message: "Nhân viên đã tồn tại",
      };
    }

    // Kiểm tra xem IDnumber đã tồn tại cho nhân viên khác hay không
    let existingStaffWithID = await staffModel.findOne({
      IDnumber,
      _id: { $ne: id },
    });
    if (existingStaffWithID) {
      throw {
        code: 1,
        message: "Số CCCD đã tồn tại cho nhân viên khác",
      };
    }

    // Kiểm tra xem phoneNumber đã tồn tại cho nhân viên khác hay không
    let existingStaffWithPhone = await staffModel.findOne({
      phoneNumber,
      _id: { $ne: id },
    });
    if (existingStaffWithPhone) {
      throw {
        code: 1,
        message: "Số điện thoại đã tồn tại cho nhân viên khác",
      };
    }

    // Cập nhật thông tin nhân viên
    let existingStaff = await staffModel.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          username,
          password,
          phoneNumber,
          IDnumber,
          dateOfBirth,
          role,
        },
      },
      { new: true }
    );

    res.status(200).json({
      code: 0,
      message: "Chỉnh sửa thông tin nhân viên thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Logout",
    });
  }
};

let viewListStaff = async (req, res) => {
  try {
    const currentPage = req.params.currentPage || 1;

    const count = await staffModel.countDocuments();

    const offset = 12 * (currentPage - 1);

    const staffs = await staffModel
      .find()
      .limit(12)
      .skip(offset)
      .sort({ createdAt: -1 });

    if (!staffs || staffs.length === 0) {
      throw {
        code: 1,
        message: "Không có data nào",
      };
    }

    res.status(200).json({
      code: 0,
      message: "Tìm kiếm thành công",
      count: count,
      data: staffs,
    });
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Lỗi:viewListStaff ",
    });
  }
};

let searchStaff = async (req, res) => {
  try {
    const currentPage = req.params.currentPage || 1;
    const keyword = req.params.keyword || null;

    if (!keyword) {
      throw {
        code: 1,
        message: "Hãy nhập nội dung tìm kiếm",
      };
    }

    const regex = new RegExp(keyword, "i");

    const count = await staffModel.countDocuments({
      name: regex, // Tìm kiếm tiêu đề chứa từ khóa
    });

    const offset = 12 * (currentPage - 1);

    const staffs = await staffModel
      .find({
        name: regex,
      })
      .limit(12)
      .skip(offset)
      .sort({ createdAt: -1 });

    if (!staffs || staffs.length === 0) {
      throw {
        code: 1,
        message: "Không có data nào",
      };
    }

    res.status(200).json({
      code: 0,
      message: "Tìm kiếm thành công",
      count: count,
      data: staffs,
    });
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Lỗi: searchGuest",
    });
  }
};

module.exports = {
  login,
  refresh,
  logout,
  add,
  edit,
  viewListStaff,
  searchStaff,
};
