//File contains endpoints for car related requests.
const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require("../middlewares/authMiddleware");

// controllers import
const {
    mongoDBCreateCarController,
    mongoDBGetCarsCountController,
    mongoDBDeleteCarController,
    mongoDBGetSingleCarController,
    mongoDBUpdateCarController,
    mongoDBGetAllCarsController,
    mongoDBFetchCarByFilterController
} = require("../controllers/carController");

// routesController
router.post("/car/new", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, mongoDBCreateCarController);
router.delete("/car/:slug", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, mongoDBDeleteCarController);
router.get("/cars/total", fireBaseAuthCheckMiddleware, mongoDBGetCarsCountController);
router.get("/car/:slug", fireBaseAuthCheckMiddleware, mongoDBGetSingleCarController);
router.put("/car/:slug", fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware, mongoDBUpdateCarController);
router.post("/cars", mongoDBGetAllCarsController);
router.post("/search/filters", mongoDBFetchCarByFilterController);

module.exports = router;
