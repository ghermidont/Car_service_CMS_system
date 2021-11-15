"use strict";
//File contains endpoints for user operation requests.

const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");
const { updateUserController } = require("../controllers/userController");

// routes
router.put("/user/update-user/:slug", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, updateUserController);

module.exports = router;
