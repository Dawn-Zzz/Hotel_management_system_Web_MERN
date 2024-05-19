const serviceModel = require("../models/serviceModel");


let add = async (req, res) => {
    try {
        const { name, price} = req.body;
        if (!name || !price) {
            throw {
              code: 1,
              message: "Không được bỏ trống thông tin",
            };
          }
      // kiểm tra tên dịch vụ đã tồn tại chưa
      let service = await serviceModel.findOne({name})

      if (service) {
        throw {
          code: 1,
          message: "Tên dịch vụ đã tồn tại",
        };
      }
  
        service = await serviceModel.create({
            name,
            price
        })

        res.status(200).json({
            code: 0,
            message: "Tạo dịch vụ thành công",
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
     const { id, name, price} = req.body;

     if (!name || !price) {
        throw {
          code: 1,
          message: "Không được bỏ trống thông tin",
        };
      }

    // Kiểm tra xem tên dịch vụ đã tồn tại cho một dịch vụ khác chưa
    let existingService = await serviceModel.findOne({ name, _id: { $ne: id } });
    if (existingService) {
      throw {
        code: 1,
        message: "Tên dịch vụ đã tồn tại cho một dịch vụ khác",
      };
    }

    // Cập nhật thông tin dịch vụ
    let updatedService = await serviceModel.findByIdAndUpdate(
      id,
      { $set: { name, price } },
      { new: true }
    );

    res.status(200).json({
        code: 0,
        message: "Chỉnh sửa thông tin dịch vụ thành công",
      });
    } catch (error) {
      console.error(error);
      res.status(200).json({
        code: error.code || 1,
        message: error.message || "Đã có lỗi xảy ra: Logout",
      });
    }
  };


  let viewListService = async (req, res) => {
    try {
      const currentPage = req.params.currentPage || 1;
  
      const count = await serviceModel.countDocuments(
       
      );
  
      const offset = 12 * (currentPage - 1);
  
      const service = await serviceModel.find(
        
      )
        .limit(12)
        .skip(offset)
        .sort({ createdAt: -1 });
  
      if (!service || service.length === 0) {
        throw {
          code: 1,
          message: "Không có data nào",
        };
      }
  
      res.status(200).json({
        code: 0,
        message: "Lấy dữ liệu thành công",
        count: count,
        data: service,
      });
    } catch (error) {
      res.status(200).json({
        code: error.code || 1,
        message: error.message || "Lỗi: viewListService",
      });
    }
  };

  let searchService = async (req, res) => {
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
  
      const count = await serviceModel.countDocuments({
        name: regex, // Tìm kiếm tiêu đề chứa từ khóa
      });
  
      const offset = 12 * (currentPage - 1);
  
      const service = await serviceModel.find({
        name: regex,
      })
        .limit(12)
        .skip(offset)
        .sort({ createdAt: -1 });
  
      if (!service || service.length === 0) {
        throw {
          code: 1,
          message: "Không có data nào",
        };
      }
  
      res.status(200).json({
        code: 0,
        message: "Tìm kiếm thành công",
        count: count,
        data: service,
      });
    } catch (error) {
      res.status(200).json({
        code: error.code || 1,
        message: error.message || "Lỗi: searchService",
      });
    }
  };

  module.exports = {
    add,
    edit,
    viewListService,
    searchService
  };
  