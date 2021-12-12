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
    "/admin/user/delete",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    mongoDBFireBaseDeleteUserController
);

router.get(
    "/admin/user",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    getSingleUserController
);

router.put(
    "/admin/user/access",
    //fireBaseAuthCheckMiddleware,
    //mongoDbAdminCheckMiddleware,
    mongoDBToggleUserAccessController
);

router.get(
    "/admin/users/total",
    //fireBaseAuthCheckMiddleware,
    //mongoDbAdminCheckMiddleware,
    mongoDBUsersCountController
);

router.post(
    "/admin/users",
    //fireBaseAuthCheckMiddleware,
    //mongoDbAdminCheckMiddleware,
    mongoDBGetAllUsersController
);

router.post(
    "/search/users/search",
    mongoDbAdminCheckMiddleware,
    searchFiltersController
);

module.exports = router;
