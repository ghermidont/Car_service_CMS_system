"use strict";

//File contains endpoints for images manipulation requests.
const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware } = require("../middlewares/authMiddleware");

// controllers
const { cloudinaryImageUploadController, cloudinaryImageRemoveController } = require("../controllers/cloudinaryController");

router.post("/image/upload", fireBaseAuthCheckMiddleware, cloudinaryImageUploadController);
router.delete("/image/remove", fireBaseAuthCheckMiddleware, cloudinaryImageRemoveController);

module.exports = router;