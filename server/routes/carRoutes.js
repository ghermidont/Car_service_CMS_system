//File contains endpoints for car related requests.
const express = require("express");
const Router = express.Router();

// middlewares
const { authCheckMiddleware, adminCheckMiddleware } = require("../middlewares/auth");

// controllers import
const {
  createCarController,
  listAllCarsController,
  removeCarController,
  getSingleCarController,
  updateCarController,
  carsListForPaginationController,
  searchFiltersController
} = require("../controllers/carController");

// routesController
Router.post("/car/add-car", authCheckMiddleware, adminCheckMiddleware, createCarController);
Router.get("/cars/total", listAllCarsController);
Router.delete("/car/:slug", authCheckMiddleware, adminCheckMiddleware, removeCarController);
Router.get("/car/:slug", getSingleCarController);
Router.put("/car/:slug", authCheckMiddleware, adminCheckMiddleware, updateCarController);
Router.post("/cars", carsListForPaginationController);
Router.post("/search/filters", searchFiltersController);

module.exports = Router;
