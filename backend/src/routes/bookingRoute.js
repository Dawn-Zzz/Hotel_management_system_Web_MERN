const express = require("express");
const bookingController = require("../controllers/bookingController");
// const { checkJWT } = require("../middleware/jwtActions");
const router = express.Router();

router.post("/create", bookingController.createBooking);
router.get("/view", bookingController.getAvailableRooms);

module.exports = router;
