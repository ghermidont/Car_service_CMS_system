"use strict";

//File contains endpoints for images manipulation requests.
const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");

// controllers
const { imageUploadController, imageRemoveController } = require("../controllers/cloudinaryController");

router.post("/upload_images", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, imageUploadController);
router.post("/remove_image", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, imageRemoveController);

module.exports = router;
