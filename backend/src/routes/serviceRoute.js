const express = require("express");
const serviceController = require("../controllers/serviceController");
// const { checkAdminJWT } = require("../middleware/jwtActions");
const router = express.Router();

router.post("/add", serviceController.add);
router.post("/edit", serviceController.edit);
router.get("/viewListService/:currentPage", serviceController.viewListService);
router.get("/searchService/:currentPage&:keyword", serviceController.searchservice);

module.exports = router;