"use strict";
//File contains endpoints for provided services manipulations requests.
const express = require("express");
const Router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");

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
Router.post("/service/new", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, createServiceController);
Router.get("/services/total", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, listAllServicesController);
Router.delete("/service/:slug", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, deleteServiceController);
Router.get("/service/:slug", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, getSingleServiceController);
Router.put("/service/:slug", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, updateServiceController);
Router.post("/services", servicesListForPaginationController);
Router.post("/search/filters", searchFiltersController);

module.exports = Router;
