"use strict";

//File contains endpoints for images manipulation requests.
const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");

// controllers
const { upload, remove } = require("../controllers/cloudinaryController");

router.post("/upload-images", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, upload);
router.post("/remove-image", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, remove);

module.exports = router;
