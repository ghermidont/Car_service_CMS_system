"use strict";

//File contains endpoints for client related requests.
const express = require("express");
const router = express.Router();

// middlewares
const { authCheckMiddleware, adminCheckMiddleware } = require("../middlewares/authMiddleware");

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
router.post("/client/new", authCheckMiddleware, adminCheckMiddleware, createClientController);
router.get("/clients/total",  authCheckMiddleware, adminCheckMiddleware, listAllClientsController);
router.delete("/client/:slug", authCheckMiddleware, adminCheckMiddleware, deleteClientController);
router.get("/client/:slug", authCheckMiddleware, adminCheckMiddleware, getSingleClientController);
router.put("/client/:slug", authCheckMiddleware, adminCheckMiddleware, updateClientController);
router.post("/clients", authCheckMiddleware, adminCheckMiddleware, clientsListForPaginationController);
router.post("/search/filters", searchFiltersController);

module.exports = router;
