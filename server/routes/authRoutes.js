"use strict";

//File contains endpoints for authentication related requests. Write user data to MongoBD database.
const express = require("express");
const router = express.Router();

// middlewares
const { authCheckMiddleware, adminCheckMiddleware } = require("../middlewares/authMiddleware");

// Controllers. In order not to write the functions in the body of the route,
// we create a separate folder with the functions you need to control the routes.
const { createOrUpdateUserController, currentUserController } = require("../controllers/authController");

//We apply the middleware (in this case "authCheck") before the response we send.
router.post("/create-or-update-user", authCheckMiddleware, createOrUpdateUserController);
router.post("/current-user", authCheckMiddleware, currentUserController);
//Here we called two middlewares after we return the user.
router.post("/current-admin", authCheckMiddleware, adminCheckMiddleware, currentUserController);

module.exports = router;
