const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const invoiceSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: "String",
    //   default: uuidv4,
    // },
    guest: { type: mongoose.Schema.Types.ObjectId, ref: "Guest" },
    roomBooking: { type: mongoose.Schema.Types.ObjectId, ref: "RoomBooking" },
    serviceBooking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceBooking",
    },
    roomCharge: { type: Number, require: true },
    serviceCharge: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
