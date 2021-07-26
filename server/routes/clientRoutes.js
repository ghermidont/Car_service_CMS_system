"use strict";

//File contains endpoints for client related requests.
const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers import
const {
  createClientController,
  listAllClientsController,
  deleteClientController,
  getSingleClientController,
  updateClientController,
  clientsListForPaginationController,
  searchFiltersController
} = require("../controllers/serviceClientController");

// routes
router.post("/client/new", authCheck, adminCheck, createClientController);
router.get("/clients/total",  authCheck, adminCheck, listAllClientsController);
router.delete("/client/:slug", authCheck, adminCheck, deleteClientController);
router.get("/client/:slug", authCheck, adminCheck, getSingleClientController);
router.put("/client/:slug", authCheck, adminCheck, updateClientController);
router.post("/clients", authCheck, adminCheck, clientsListForPaginationController);
router.post("/search/filters", searchFiltersController);

module.exports = router;
