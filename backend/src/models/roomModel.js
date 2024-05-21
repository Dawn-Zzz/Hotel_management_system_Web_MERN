const mongoose = require("mongoose");
// const { v4: uuidv4 } = require("uuid");

const roomSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: "String",
    //   default: uuidv4,
    // },
    numberRoom: { type: String, required: true },
    status: { type: String, required: true },
    roomType: { type: mongoose.Schema.Types.ObjectId, ref: "RoomType" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", roomSchema);
