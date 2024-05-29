const express = require("express");
const bookingController = require("../controllers/bookingController");
// const { checkJWT } = require("../middleware/jwtActions");
const router = express.Router();

router.post("/create", bookingController.createBooking);
router.put("/edit/:id", bookingController.editBooking);
router.get(
  "/viewListFreeRoom/:checkin/:checkout",
  bookingController.getAvailableRooms
);
router.get("/:currentPage", bookingController.viewListBooking);
router.get("/view/:id", bookingController.getById);

module.exports = router;
