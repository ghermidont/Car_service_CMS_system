const express = require("express");

const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// Controllers. In order not to write the functions in the body of the route,
// we create a separate folder with the functions you need to control the routes.
const { createOrUpdateUser, currentUser } = require("../controllers/auth");

//We apply the middleware (in this case "authCheck") before the response we send.
router.post("/create-or-update-user", authCheck, createOrUpdateUser);
router.post("/current-user", authCheck, currentUser);
//Here we called two middlewares after we return the user.
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router;
