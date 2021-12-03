//File contains endpoints for car related requests.
const express = require( "express" );
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware } = require( "../middlewares/authMiddleware" );

// controllers import
const {
    mongoDBCreateCarController,
    mongoDBGetCarsCountController,
    mongoDBDeleteCarController,
    mongoDBGetSingleCarController,
    mongoDBUpdateCarController,
    mongoDBGetAllCarsController,
    mongoDBFetchCarByFilterController
} = require( "../controllers/carController" );

// routesController
router.post(
    "/car/new",
    fireBaseAuthCheckMiddleware,
    mongoDBCreateCarController
);

router.delete(
    "/car/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBDeleteCarController
);

router.get(
    "/cars/total",
    fireBaseAuthCheckMiddleware,
    mongoDBGetCarsCountController
);

router.get(
    "/car/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBGetSingleCarController
);

router.put(
    "/car/update/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBUpdateCarController
);

router.post(
    "/cars",
    mongoDBGetAllCarsController
);

router.post(
    "/car/search",
    mongoDBFetchCarByFilterController
);

module.exports = router;
