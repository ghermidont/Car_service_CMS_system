/**File contains endpoints for admin operation requests.*/
const express = require("express");
const router = express.Router();

// Middlewares import
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");

// Controllers import
const {
    mongoDBFireBaseDeleteUserController,
    mongoDBToggleUserAccessController,
    mongoDBUsersCountController,
    mongoDBGetAllUsersController,
    getSingleUserController,
    searchFiltersController
} = require("../controllers/adminController");

//Routes
router.delete(
    "/admin/user/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    mongoDBFireBaseDeleteUserController
);

router.get(
    "/admin/user/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    getSingleUserController
);

router.post(
    "/admin/user/access/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    mongoDBToggleUserAccessController
);

router.get(
    "/admin/users/total",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    mongoDBUsersCountController
);

router.get(
    "/admin/users",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    mongoDBGetAllUsersController
);

router.get(
    "/search/users/search",
    mongoDbAdminCheckMiddleware,
    searchFiltersController
);

module.exports = router;
