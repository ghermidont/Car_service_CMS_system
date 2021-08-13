"use strict";
//File contains endpoints for provided services manipulations requests.
const express = require("express");
const Router = express.Router();

// middlewares
const { authCheckMiddleware, adminCheckMiddleware } = require("../middlewares/authMiddleware");

// controllers import
const {
    createServiceController,
    listAllServicesController,
    deleteServiceController,
    getSingleServiceController,
    updateServiceController,
    servicesListForPaginationController,
    searchFiltersController
} = require("../controllers/serviceController");

// routes
Router.post("/service/new", authCheckMiddleware, adminCheckMiddleware, createServiceController);
Router.get("/services/total", authCheckMiddleware, adminCheckMiddleware, listAllServicesController);
Router.delete("/service/:slug", authCheckMiddleware, adminCheckMiddleware, deleteServiceController);
Router.get("/service/:slug", authCheckMiddleware, adminCheckMiddleware, getSingleServiceController);
Router.put("/service/:slug", authCheckMiddleware, adminCheckMiddleware, updateServiceController);
Router.post("/services", servicesListForPaginationController);
Router.post("/search/filters", searchFiltersController);

module.exports = Router;
