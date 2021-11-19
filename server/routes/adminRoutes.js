/**File contains endpoints for admin operation requests.*/
const express = require("express");
const router = express.Router();

// Middlewares import
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");

// Controllers import
const {
    deleteUserController,
    toggleUserAccessController,
    listAllUsersController,
    usersForPaginationController,
    getSingleUserController,
    searchFiltersController
} = require("../controllers/adminController");

//Routes
router.delete(
    "/admin/user/delete/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    deleteUserController
);

router.get(
    "/admin/user/get/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    getSingleUserController
);

router.post(
    "/admin/user/access/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    toggleUserAccessController
);

router.get(
    "/admin/users/total",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    listAllUsersController
);

router.get(
    "/admin/users/pagination",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    usersForPaginationController
);

router.get(
    "/search/users/search",
    mongoDbAdminCheckMiddleware,
    searchFiltersController
);

module.exports = router;
