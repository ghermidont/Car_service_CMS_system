"use strict";

//File contains endpoints for images manipulation requests.
const express = require("express");
const router = express.Router();

// middlewares
const { authCheckMiddleware, adminCheckMiddleware } = require("../middlewares/authMiddleware");

// controllers
const { upload, remove } = require("../controllers/cloudinaryController");

router.post("/upload-images", authCheckMiddleware, adminCheckMiddleware, upload);
router.post("/remove-image", authCheckMiddleware, adminCheckMiddleware, remove);

module.exports = router;
