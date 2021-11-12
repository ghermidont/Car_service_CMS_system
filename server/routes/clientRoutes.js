"use strict";

//File contains endpoints for client related requests.
const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");

// controllers import
const {
  createClientController,
  listAllClientsController,
  deleteClientController,
  getSingleClientController,
  updateClientController,
  clientsListForPaginationController,
  searchFiltersController
} = require("../controllers/clientController");

// routes
router.post("/client/new", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, createClientController);
router.get("/clients/total",  fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, listAllClientsController);
router.delete("/client/:slug", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, deleteClientController);
router.get("/client/:slug", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, getSingleClientController);
router.put("/client/:slug", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, updateClientController);
router.post("/clients", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, clientsListForPaginationController);
router.post("/search/filters", searchFiltersController);

module.exports = router;
