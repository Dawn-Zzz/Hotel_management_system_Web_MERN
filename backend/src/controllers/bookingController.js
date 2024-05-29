const roomModel = require("../models/roomModel");
const roomBookingModel = require("../models/roomBookingModel");
const guestModel = require("../models/guestModel");
const bookingModel = require("../models/bookingModel");
const serviceBookingModel = require("../models/serviceBookingModel");

const createBooking = async (req, res) => {
  try {
    const data = req.body;
    if (
      !data.phoneNumber ||
      !data.checkin ||
      !data.checkout ||
      !data.roomBookings
    ) {
      throw {
        code: 1,
        message: "Không được bỏ trống thông tin",
      };
    }

    const guest = await guestModel.findOne({
      phoneNumber: data.phoneNumber,
    });

    if (!guest) {
      throw {
        code: 1,
        message: "Không tồn tại khách hàng có số điện thoại trên",
      };
    }

    // Tạo một mảng các đặt phòng từ roomBookings được cung cấp
    const createdRoomBookings = await Promise.all(
      data.roomBookings.map(async (roomBooking) => {
        const createdRoomBooking = await roomBookingModel.create(roomBooking);
        return createdRoomBooking._id;
      })
    );

    // Tạo một đặt phòng mới với thông tin được cung cấp và danh sách các đặt phòng của phòng
    const booking = await bookingModel.create({
      guest: guest._id,
      checkin: data.checkin,
      checkout: data.checkout,
      roomInteraction: "Chưa nhận phòng",
      roomBookings: createdRoomBookings,
    });

    res.status(200).json({
      code: 0,
      message: "Đặt phòng thành công",
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Booking",
    });
  }
};

let editBooking = async (req, res) => {
  const { roomInteraction, serviceBookings } = req.body;
  const id = req.params.id;

  // Valid room interaction states
  const validRoomInteractions = [
    "Đã nhận phòng",
    "Đã hủy phòng",
    "Đã trả phòng",
  ];

  try {
    // Check if roomInteraction is valid
    if (!validRoomInteractions.includes(roomInteraction)) {
      throw {
        code: 1,
        message: "Hành động tương tác phòng đấy không tồn tại",
      };
    }

    const booking = await bookingModel.findById(id).populate("roomBookings");
    if (!booking) {
      throw {
        code: 1,
        message: "Booking không tồn tại",
      };
    }

    const currentDate = new Date().toISOString().split("T")[0]; // format to YYYY-MM-DD;

    if (roomInteraction === "Đã nhận phòng") {
      const checkin = booking.checkin.toISOString().split("T")[0];
      if (checkin > currentDate) {
        throw {
          code: 1,
          message: "Chưa tới ngày nhận phòng",
        };
      }
      // Update hiện trạng phòng
      const roomBookingIds = booking.roomBookings.map((rb) => rb.room);
      await roomModel.updateMany(
        { _id: { $in: roomBookingIds } },
        { $set: { isFree: false } }
      );
    }

    let createdServiceBookings = null;
    if (serviceBookings && roomInteraction === "Đã trả phòng") {
      createdServiceBookings = await Promise.all(
        serviceBookings.map(async (serviceBooking) => {
          const createdServiceBooking = await serviceBookingModel.create(
            serviceBooking
          );
          return createdServiceBooking._id;
        })
      );
      // Update hiện trạng phòng
      const roomBookingIds = booking.roomBookings.map((rb) => rb.room);
      await roomModel.updateMany(
        { _id: { $in: roomBookingIds } },
        { $set: { isFree: true } }
      );
    }

    let updatedBooking = await bookingModel.findByIdAndUpdate(
      id,
      {
        $set: {
          roomInteraction: roomInteraction,
          serviceBookings: createdServiceBookings,
        },
      },
      { new: true }
    );

    if (!updatedBooking) {
      throw {
        code: 1,
        message: "Booking không tồn tại",
      };
    }

    res.status(200).json({
      code: 0,
      message: "Chỉnh sửa thông tin Booking thành công",
      data: updatedBooking,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Booking",
    });
  }
};

const getAvailableRooms = async (req, res) => {
  try {
    const { checkin, checkout } = req.params;
    // Tìm tất cả các đặt phòng có ngày check-in hoặc check-out chồng chéo với khoảng thời gian đã cung cấp
    const bookedRooms = await bookingModel
      .find({
        $and: [
          { checkin: { $lt: checkout } },
          { checkout: { $gt: checkin } },
          { roomInteraction: { $nin: ["Đã hủy phòng", "Đã trả phòng"] } },
        ],
      })
      .populate("roomBookings");

    // Lấy danh sách tất cả các ID phòng đã được đặt
    const bookedRoomIds = bookedRooms.flatMap((booking) =>
      booking.roomBookings.map((roomBooking) => roomBooking.room)
    );

    // Tìm tất cả các phòng không nằm trong danh sách các ID phòng đã được đặt
    const availableRooms = await roomModel.find({
      _id: { $nin: bookedRoomIds },
    });

    // Trả về danh sách các phòng còn trống
    res.status(200).json({
      code: 0,
      message: "Lấy dữ liệu thành công",
      data: availableRooms,
    });
  } catch (error) {
    console.error(error);
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Đã có lỗi xảy ra: Booking",
    });
  }
};

let viewListBooking = async (req, res) => {
  try {
    const currentPage = req.params.currentPage || 1;

    const count = await bookingModel.countDocuments();

    const offset = 12 * (currentPage - 1);

    const booking = await bookingModel
      .find()
      .limit(12)
      .skip(offset)
      .sort({ createdAt: -1 });

    if (!booking || booking.length === 0) {
      throw {
        code: 1,
        message: "Không có data nào",
      };
    }

    res.status(200).json({
      code: 0,
      message: "Lấy dự liệu thành công",
      count: count,
      data: booking,
    });
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message || "Lỗi: viewListBooking",
    });
  }
};

let getById = async (req, res) => {
  try {
    const id = req.params.id;
    await bookingModel
      .findById({ _id: id })
      .then((booking) => res.json(booking));
  } catch (error) {
    res.status(200).json({
      code: error.code || 1,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  editBooking,
  getAvailableRooms,
  viewListBooking,
  getById,
};
