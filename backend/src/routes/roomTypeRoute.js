const express = require("express");
const roomTypeController = require("../controllers/roomTypeController");
// const { checkAdminJWT } = require("../middleware/jwtActions");
const router = express.Router();

router.post("/add", roomTypeController.add);
router.post("/edit", roomTypeController.edit);
router.post("/delete", roomTypeController.deleteRoomType);
router.get("/viewListRoomType/:currentPage", roomTypeController.viewListRoomType);
router.get("/searchRoomType/:currentPage&:keyword", roomTypeController.searchRoomType);

module.exports = router;