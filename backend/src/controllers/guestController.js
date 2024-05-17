const guestModel = require("../models/guestModel");

let add = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, IDnumber, dateOfBirth, guestCategories} = req.body;
        if (!name || !phoneNumber || !IDnumber || !dateOfBirth || !guestCategories) {
            throw {
              code: 1,
              message: "Không được bỏ trống thông tin",
            };
          }
      // kiểm tra khách hàng đã tồn tại hay chưa
      let guest = await guestModel.findOne({phoneNumber})

      if (guest) {
        throw {
          code: 1,
          message: "Số điện thoại đã tồn tại",
        };
      }
  
      guest = await guestModel.findOne({IDnumber})
      if (guest) {
        throw {
          code: 1,
          message: "Số CCCD đã tồn tại",
        };
      }

        guest = await guestModel.create({
            name,
            email,
            password,
            phoneNumber,
            IDnumber,
            dateOfBirth,
            guestCategories,
        })

        res.status(200).json({
            code: 0,
            message: "Tạo khách hàng thành công",
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
     const { id, name, phoneNumber, IDnumber, dateOfBirth, guestCategories} = req.body;

     if (!name || !phoneNumber || !IDnumber || !dateOfBirth || !guestCategories) {
        throw {
          code: 1,
          message: "Không được bỏ trống thông tin",
        };
      }

    let guest = await guestModel.findById(id)
    if (!guest) {
      throw {
        code: 1,
        message: "Khách hàng không tồn tại",
      };
    }

    // Kiểm tra xem IDnumber đã tồn tại cho khách hàng khác hay không
    let existingGuestWithID = await guestModel.findOne({ IDnumber, _id: { $ne: id } });
    if (existingGuestWithID) {
      throw {
        code: 1,
        message: "Số CCCD đã tồn tại cho khách hàng khác",
      };
    }

    // Kiểm tra xem phoneNumber đã tồn tại cho khách hàng khác hay không
    let existingGuestWithPhone = await guestModel.findOne({ phoneNumber, _id: { $ne: id } });
    if (existingGuestWithPhone) {
      throw {
        code: 1,
        message: "Số điện thoại đã tồn tại cho khách hàng khác",
      };
    }

    // Cập nhật thông tin khách hàng
    let updatedGuest = await guestModel.findByIdAndUpdate(
      id,
      { $set: { name, phoneNumber, IDnumber, dateOfBirth, guestCategories } },
      { new: true }
    );

    res.status(200).json({
        code: 0,
        message: "Chỉnh sửa thông tin khách hàng thành công",
      });
    } catch (error) {
      console.error(error);
      res.status(200).json({
        code: error.code || 1,
        message: error.message || "Đã có lỗi xảy ra: Logout",
      });
    }
  };


  let viewListGuest = async (req, res) => {
    try {
      const currentPage = req.params.currentPage || 1;
  
      const count = await guestModel.countDocuments(
       
      );
  
      const offset = 12 * (currentPage - 1);
  
      const guest = await guestModel.find(
        
      )
        .limit(12)
        .skip(offset)
        .sort({ createdAt: -1 });
  
      if (!guest || guest.length === 0) {
        throw {
          code: 1,
          message: "Không có data nào",
        };
      }
  
      res.status(200).json({
        code: 0,
        message: "Lấy dự liệu thành công",
        count: count,
        data: guest,
      });
    } catch (error) {
      res.status(200).json({
        code: error.code || 1,
        message: error.message || "Lỗi: searchAdminRole",
      });
    }
  };

  let searchGuest = async (req, res) => {
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
  
      const count = await guestModel.countDocuments({
        name: regex, // Tìm kiếm tiêu đề chứa từ khóa
      });
  
      const offset = 12 * (currentPage - 1);
  
      const guest = await guestModel.find({
        name: regex,
      })
        .limit(12)
        .skip(offset)
        .sort({ createdAt: -1 });
  
      if (!guest || guest.length === 0) {
        throw {
          code: 1,
          message: "Không có data nào",
        };
      }
  
      res.status(200).json({
        code: 0,
        message: "Tìm kiếm thành công",
        count: count,
        data: guest,
      });
    } catch (error) {
      res.status(200).json({
        code: error.code || 1,
        message: error.message || "Lỗi: searchGuest",
      });
    }
  };

  module.exports = {
    add,
    edit,
    viewListGuest,
    searchGuest
  };
  