/**File contains endpoints for admin operation requests.*/
const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");
const {
    deleteUserController,
    toggleUserAccessController,
    listAllUsersController,
    usersForPaginationController,
    getSingleUserController,
    searchFiltersController
} = require("../controllers/adminController");

// routes
router.delete(
    "/admin/delete-user/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    deleteUserController
);

router.get(
    "/admin/get-single-user/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    getSingleUserController
);

router.put(
    "/admin/user-access-manager/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    toggleUserAccessController
);

router.get(
    "/admin/list-all-users",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    listAllUsersController
);

router.get(
    "/admin/users-pagination",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    usersForPaginationController
);

router.get(
    "/search/users-search-filter",
    searchFiltersController
);

module.exports = router;
