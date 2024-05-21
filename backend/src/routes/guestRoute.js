const express = require("express");
const guestController = require("../controllers/guestController");
// const { checkAdminJWT } = require("../middleware/jwtActions");
const router = express.Router();

router.post("/add", guestController.add);
router.post("/edit/:id", guestController.edit);
router.get("/viewListGuest/:currentPage", guestController.viewListGuest);
router.get("/searchGuest/:currentPage&:keyword", guestController.searchGuest);
router.get("/:id", guestController.getById);

module.exports = router;
