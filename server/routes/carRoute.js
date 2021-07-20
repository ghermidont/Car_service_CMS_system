const express = require("express");
const Router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controllers import
const {
  createCar,
  listAllCars,
  removeCar,
  getSingleCar,
  updateCar,
  carsListForPagination,
  carsCount,
  searchFilters
} = require("../controllers/carController");

// routes
Router.post("/car", authCheck, adminCheck, createCar);
Router.get("/cars/total", carsCount);
Router.get("/cars/:count", listAllCars); // products/100
Router.delete("/car/:slug", authCheck, adminCheck, removeCar);
Router.get("/car/:slug", getSingleCar);
Router.put("/car/:slug", authCheck, adminCheck, updateCar);
Router.post("/cars", carsListForPagination);
// search
Router.post("/search/filters", searchFilters);

module.exports = Router;
