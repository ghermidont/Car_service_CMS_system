"use strict";
//File contains endpoints for admin operation requests.

const express = require("express");
const router = express.Router();

// middlewares
const { authCheckMiddleware, adminCheckMiddleware } = require("../middlewares/authMiddleware");
const {
    deleteUserController,
    toggleUserAccessController,
    listAllUsersController,
    usersForPaginationController,
    getSingleUserController,
    searchFiltersController
} = require("../controllers/adminController");

// routes
router.delete("/admin/user-delete/:slug", authCheckMiddleware, adminCheckMiddleware, deleteUserController);
router.get("/admin/user/:slug", authCheckMiddleware, adminCheckMiddleware, getSingleUserController);
router.put("/admin/user-access/:slug", authCheckMiddleware, adminCheckMiddleware, toggleUserAccessController);
router.get("/admin/users",  authCheckMiddleware, adminCheckMiddleware, listAllUsersController);
router.post("/admin/users-pagination", authCheckMiddleware, adminCheckMiddleware, usersForPaginationController);
router.post("/search/filters", searchFiltersController);

module.exports = router;
