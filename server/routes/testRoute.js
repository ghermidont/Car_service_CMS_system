const express = require("express");
const {mongoDBTestController} = require("../controllers/testController");
const router = express.Router();
//const { fireBaseAuthCheckMiddleware } = require("../middlewares/authMiddleware");

router.post("/test/create", mongoDBTestController);

module.exports = router;