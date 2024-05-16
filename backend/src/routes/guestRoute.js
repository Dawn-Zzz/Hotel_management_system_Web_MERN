const express = require("express");
const guestController = require("../controllers/guestController");
// const { checkAdminJWT } = require("../middleware/jwtActions");
const router = express.Router();

router.post("/add", guestController.add);
// router.post("/edit", guestController);
// router.get("viewListGuest", guestController);

module.exports = router;