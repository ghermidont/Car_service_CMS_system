"use strict";

//File contains endpoints for car related requests.
const express = require("express");
const router = express.Router();

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
router.post("/car/add-car", authCheckMiddleware, adminCheckMiddleware, createCarController);
router.get("/cars/total", listAllCarsController);
router.delete("/car/:slug", authCheckMiddleware, adminCheckMiddleware, removeCarController);
router.get("/car/:slug", getSingleCarController);
router.put("/car/:slug", authCheckMiddleware, adminCheckMiddleware, updateCarController);
router.post("/cars", carsListForPaginationController);
router.post("/search/filters", searchFiltersController);

module.exports = router;
