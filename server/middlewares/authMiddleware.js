"use strict";

const admin = require("../firebase/FireBaseSettings");
const User = require("../models/CMSuserModel");

// First layer of security. Checking the Firebase for the user.
exports.authCheck = async (req, res, next) => {
  //We send the auth token in the request headers (req.headers.authToken).
    try {
        // Write the current user from the Firebase to the request object.
       req.user = await admin
      .auth()
      .verifyIdToken(req.headers.authToken);
       next();
  } catch (err) {  
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

// Second layer of security. Check in the MongoDB database if the user is admin.
exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email }).exec();
  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Admin resource. Access denied.",
    });
  } else {
    next();
  }
};
