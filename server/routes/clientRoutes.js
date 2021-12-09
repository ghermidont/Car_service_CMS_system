//File contains endpoints for client related requests.
const express = require( "express" );
const router = express.Router();

// middlewares
const { fireBaseAuthCheckMiddleware } = require( "../middlewares/authMiddleware");

// controllers import
const {
    mongoDBCreateClientController,
    mongoDBGetClientsCountController,
    mongoDBDeleteClientController,
    mongoDBGetSingleClientController,
    mongoDBUpdateClientController,
    mongoDBGetAllClientsController,
    mongoDBGetAllClientsNoPagController,
    mongoDBFetchClientByFilterController
} = require("../controllers/clientController");

// routesController
router.post(
    "/client/new",
    fireBaseAuthCheckMiddleware,
    mongoDBCreateClientController
);

router.delete(
    "/client/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBDeleteClientController
);

router.get(
    "/clients/total",
    fireBaseAuthCheckMiddleware,
    mongoDBGetClientsCountController
);

router.get(
    "/client/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBGetSingleClientController
);

router.put(
    "/client/update/:slug",
    fireBaseAuthCheckMiddleware,
    mongoDBUpdateClientController
);

router.post(
    "/clients/pagination",
    mongoDBGetAllClientsController
);

router.post(
    "/clients",
    mongoDBGetAllClientsNoPagController
);

router.post(
    "/client/search",
    mongoDBFetchClientByFilterController
);

module.exports = router;
