const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const roomTypeSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: "String",
    //   default: uuidv4,
    // },
    name: { type: String, required: true },
    price: { type: Number },
    images: {type: String},
    capacity: {type: Number}
  },
  { timestamps: true }
);

module.exports = mongoose.model("roomtype", roomTypeSchema);
