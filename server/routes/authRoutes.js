"use strict";

//File contains endpoints for authentication related requests. Write user data to MongoBD database.
const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");

// Controllers. In order not to write the functions in the body of the route,
// we create a separate folder with the functions you need to control the routes.
const { createUserController, mongoDBGetCurrentUserController } = require("../controllers/authController");
const { updateUserController } = require("../controllers/userController");

//We apply the middleware (in this case "authCheck") before the response we send.
router.post("/auth/create-user", createUserController);
router.get("/auth/get-current-user", fireBaseAuthCheckMiddleware, mongoDBGetCurrentUserController);
//Here we called two middlewares after we return the user.
router.get("/auth/get-current-admin", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, mongoDBGetCurrentUserController);

module.exports = router;
