"use strict";
//File contains endpoints for provided services manipulations requests.
const express = require("express");
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware } = require( "../middlewares/authMiddleware" );

// controllers import
const {
    mongoDBCreateServiceController,
    mongoDBGetServicesCountController,
    mongoDBDeleteServiceController,
    mongoDBGetSingleServiceController,
    mongoDBUpdateServiceController,
    mongoDBGetAllServicesController,
    mongoDBFetchServiceByFilterController
} = require("../controllers/serviceController");

// routesController
router.post(
    "/service/new",
    fireBaseAuthCheckMiddleware,
    mongoDBCreateServiceController
);

router.delete(
    "/service/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBDeleteServiceController
);

router.get(
    "/services/total",
    mongoDBGetServicesCountController
);

router.get(
    "/service/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBGetSingleServiceController
);

router.put(
    "/service/update/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBUpdateServiceController
);

router.post(
    "/services",
    mongoDBGetAllServicesController
);

router.post(
    "/service/search",
    mongoDBFetchServiceByFilterController
);

module.exports = router;
