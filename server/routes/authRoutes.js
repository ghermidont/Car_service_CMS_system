//File contains endpoints for authentication related requests. Write user data to MongoBD database.
const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");

// Controllers. In order not to write the functions in the body of the route,
// we create a separate folder with the functions you need to control the routes.
const { mongoDBCreateNewUserController, mongoDBGetCurrentUserController } = require("../controllers/authController");

//Apply the middleware (in this case "authCheck") before the response we send.
router.post(
    "/auth/user/create",
    fireBaseAuthCheckMiddleware,
    mongoDBCreateNewUserController
);

router.get(
    "/auth/user/current",
    fireBaseAuthCheckMiddleware,
    mongoDBGetCurrentUserController
);

//Called two middlewares after we return the user.
router.get(
    "/auth/admin/current",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    mongoDBGetCurrentUserController
);

module.exports = router;