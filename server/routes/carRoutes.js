//File contains endpoints for car related requests.
const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");

// controllers import
const {
  createCarController,
  listAllCarsController,
  deleteCarController,
  getSingleCarController,
  updateCarController,
  carsListForPaginationController,
  searchFiltersController
} = require("../controllers/carController");

// routesController
router.post("/car/add-car", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, createCarController);
router.get("/cars/total", listAllCarsController);
router.delete("/car/:slug", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, deleteCarController);
router.get("/car/:slug", getSingleCarController);
router.put("/car/:slug", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, updateCarController);
router.post("/cars", carsListForPaginationController);
router.post("/search/filters", searchFiltersController);

module.exports = router;
