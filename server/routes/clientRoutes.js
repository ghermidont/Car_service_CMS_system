//File contains endpoints for client related requests.
const express = require("express");
const Router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers import
const {
  createClient,
  listAllClients,
  removeClient,
  getSingleClient,
  updateClient,
  clientsListForPagination,
  searchFilters
} = require("../controllers/carController");

// routes
Router.post("/client/new", authCheck, adminCheck, createClient);
Router.get("/clients/total",  authCheck, adminCheck, listAllClients);
Router.delete("/client/:slug", authCheck, adminCheck, removeClient);
Router.get("/client/:slug", authCheck, adminCheck, getSingleClient);
Router.put("/client/:slug", authCheck, adminCheck, updateClient);
Router.post("/clients", authCheck, adminCheck, clientsListForPagination);
Router.post("/search/filters", searchFilters);

module.exports = Router;
