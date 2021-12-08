"use strict";
//File contains endpoints for user operation requests.

const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware } = require("../middlewares/authMiddleware");
const { mongoDBUserUpdateController } = require("../controllers/userController");

// routes
router.put("/user/update", fireBaseAuthCheckMiddleware, mongoDBUserUpdateController);

module.exports = router;
