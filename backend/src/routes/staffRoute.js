const express = require("express");
const staffController = require("../controllers/staffController");
const { checkAdminJWT } = require("../middleware/jwtActions");
const router = express.Router();

router.post("/login", staffController.login);
router.post("/refresh", checkAdminJWT, staffController.refresh);
router.post("/logout", staffController.logout);
router.post("/add", staffController.add);
router.post("/edit", staffController.edit);
router.get("/viewListStaff/:currentPage", staffController.viewListStaff);
router.get("/searchStaff/:currentPage&:keyword", staffController.searchStaff);
router.get("/:id", staffController.getById);

module.exports = router;
