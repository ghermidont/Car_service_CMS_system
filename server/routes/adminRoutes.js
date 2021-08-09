"use strict";
//File contains endpoints for admin operation requests.

const express = require("express");
const router = express.Router();

// middlewares
const { authCheckMiddleware, adminCheckMiddleware } = require("../middlewares/authMiddleware");
const {
    deleteCMSUserController,
    toggleCMSUserAccessController,
    listAllCMSUsersController,
    CMSUsersForPaginationController,
    getSingleCMSUserController,
    searchFiltersController
} = require("../controllers/adminController");

// routes
router.delete("/admin/user/delete/:slug", authCheckMiddleware, adminCheckMiddleware, deleteCMSUserController);
router.get("/admin/user/:slug", authCheckMiddleware, adminCheckMiddleware, getSingleCMSUserController);
router.put("/admin/user/access/:slug", authCheckMiddleware, adminCheckMiddleware, toggleCMSUserAccessController);
router.get("/admin/users",  authCheckMiddleware, adminCheckMiddleware, listAllCMSUsersController);
router.post("/admin/users/pagination", authCheckMiddleware, adminCheckMiddleware, CMSUsersForPaginationController);
router.post("/search/filters", searchFiltersController);

module.exports = router;
