//File contains endpoints for admin operation requests.
const express = require("express");
const { auth } = require("../firebase");
const router = express.Router();

// middlewares
const { authCheckMiddleware, adminCheckMiddleware } = require("../middlewares/authMiddleware");
const {
    createCMSUserController,
    deleteCMSUserController,
    updateCMSUserController,
    toggleCMSUserAccessController,
    listAllCMSUsersController,
    CMSUsersForPaginationController,
    getSingleCMSUserController,
    searchFiltersController
} = require("../controllers/adminController");

// routes
router.post("/admin/add-cms-user", authCheckMiddleware, adminCheckMiddleware, createCMSUserController);
router.delete("/admin/delete-cms-user/:slug", authCheckMiddleware, adminCheckMiddleware, deleteCMSUserController);
router.put("/admin/update-cma-user/:slug", authCheckMiddleware, adminCheckMiddleware, updateCMSUserController);
router.get("/admin/get-cma-user/:slug", authCheckMiddleware, adminCheckMiddleware, getSingleCMSUserController);
router.put("/admin/toggle-cms-user-access/:slug", authCheckMiddleware, adminCheckMiddleware, toggleCMSUserAccessController);
router.get("/admin/total-cms-users",  authCheckMiddleware, adminCheckMiddleware, listAllCMSUsersController);
router.post("/admin/cms-users-pagination", authCheckMiddleware, adminCheckMiddleware, CMSUsersForPaginationController);
router.post("/search/filters", searchFiltersController);

module.exports = router;
