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

  let viewListGuest = async (req, res) => {
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

  module.exports = {
    add,
    edit,
    viewListGuest,
  };
  