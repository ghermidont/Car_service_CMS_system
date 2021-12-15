"use strict";

//File contains endpoints for images manipulation requests.
const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware } = require("../middlewares/authMiddleware");

// controllers imports
const {
    cloudinaryImageUploadController,
    cloudinaryImageRemoveController
} = require("../controllers/cloudinaryController");

// Routes
router.post(
    "/image/upload",
    fireBaseAuthCheckMiddleware,
    cloudinaryImageUploadController
);

router.post(
    "/image/remove",
    fireBaseAuthCheckMiddleware,
    cloudinaryImageRemoveController
);

module.exports = router;