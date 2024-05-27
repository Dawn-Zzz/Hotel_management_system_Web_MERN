const Booking = require("../models/bookingModel");
const Room = require("../models/roomModel");
const RoomBooking = require("../models/roomBookingModel");
const guestModel = require("../models/guestModel");
const bookingModel = require("../models/bookingModel");

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
                const createdRoomBooking = await RoomBooking.create(
                    roomBooking
                );
                return createdRoomBooking._id;
            })
        );

        // Tạo một đặt phòng mới với thông tin được cung cấp và danh sách các đặt phòng của phòng
        const booking = await Booking.create({
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

const getAvailableRooms = async (req, res) => {
    try {
        const { checkin, checkout, roomType } = req.body;
        // Tìm tất cả các booking có ngày checkin hoặc checkout nằm trong khoảng thời gian được cung cấp
        const bookedRooms = await Booking.find({
            $or: [
                {
                    $and: [
                        { checkin: { $gte: checkin } },
                        { checkin: { $lt: checkout } },
                    ],
                },
                {
                    $and: [
                        { checkout: { $gt: checkin } },
                        { checkout: { $lte: checkout } },
                    ],
                },
            ],
        }).populate("roomBookings.room");

        // // Lọc các phòng đã được đặt hoặc nhận trong khoảng thời gian đã cung cấp
        // const bookedRoomIds = bookedRooms.flatMap((booking) =>
        //   booking.roomBookings.map((roomBooking) => roomBooking.room._id)
        // );
        // const flatBookedRoomIds = [].concat(...bookedRoomIds);

        // // Tìm tất cả các phòng không nằm trong danh sách các phòng đã được đặt hoặc nhận
        // const availableRooms = await Room.find({
        //   roomType: roomType,
        //   _id: { $nin: flatBookedRoomIds },
        // });

        // Trả về danh sách tên các phòng không trùng ngày với các đặt phòng hoặc nhận phòng
        res.status(200).json({
            code: 0,
            message: "Lấy dự liệu thành công",
            data: bookedRooms,
        });
    } catch (error) {
        console.error(error);
        throw new Error("Error retrieving available rooms");
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
    getAvailableRooms,
    viewListBooking,
    getById,
};
