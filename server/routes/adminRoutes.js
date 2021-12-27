/**File contains endpoints for admin operation requests.*/
//TO DO: In production activate the auth and admin checks.
const express = require( "express" );
const router = express.Router();

// Middlewares import
const { fireBaseAuthCheckMiddleware, mongoDbAdminCheckMiddleware } = require( "../middlewares/authMiddleware" );

// Controllers import
const {
    mongoDBFireBaseDeleteUserController,
    mongoDBToggleUserAccessController,
    mongoDBToggleUserStatusController,
    mongoDBUsersCountController,
    mongoDBGetAllUsersController,
    getSingleUserController,
    searchFiltersController
} = require( "../controllers/adminController" );

//Routes
router.delete(
    "/admin/user/delete",
    //fireBaseAuthCheckMiddleware,
    mongoDBFireBaseDeleteUserController
);

router.get(
    "/admin/user",
    fireBaseAuthCheckMiddleware,
    mongoDbAdminCheckMiddleware,
    getSingleUserController
);

router.put(
    "/admin/user/access",
    //fireBaseAuthCheckMiddleware,
    //mongoDbAdminCheckMiddleware,
    mongoDBToggleUserAccessController
);

router.put(
    "/admin/user/status",
    //fireBaseAuthCheckMiddleware,
    //mongoDbAdminCheckMiddleware,
    mongoDBToggleUserStatusController
);

router.get(
    "/admin/users/total",
    //fireBaseAuthCheckMiddleware,
    //mongoDbAdminCheckMiddleware,
    mongoDBUsersCountController
);

router.post(
    "/admin/users",
    //fireBaseAuthCheckMiddleware,
    //mongoDbAdminCheckMiddleware,
    mongoDBGetAllUsersController
);

router.post(
    "/search/users/search",
    mongoDbAdminCheckMiddleware,
    searchFiltersController
);

module.exports = router;
