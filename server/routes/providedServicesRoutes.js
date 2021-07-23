//File contains endpoints for provided services manipulations requests.
const express = require("express");
const Router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers import
const {
    createProvidedService,
    listAllProvidedServices,
    removeProvidedService,
    getSingleProvidedService,
    updateProvidedService,
    providedServicesForPagination,
    searchFilters
} = require("../controllers/providedServicesController");

// routes
Router.post("/service/new", authCheck, adminCheck, createProvidedService);
Router.get("/services/total", authCheck, adminCheck, listAllProvidedServices);
Router.delete("/service/:slug", authCheck, adminCheck, removeProvidedService);
Router.get("/service/:slug", authCheck, adminCheck, getSingleProvidedService);
Router.put("/service/:slug", authCheck, adminCheck, updateProvidedService);
Router.post("/services", providedServicesForPagination);
Router.post("/search/filters", searchFilters);

module.exports = Router;
