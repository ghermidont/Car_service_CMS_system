const admin = require("../firebase/fireBaseSettings");
const User = require("../models/userModel");

// First layer of security. Checking the Firebase for the user.
exports.fireBaseAuthCheckMiddleware = async (req, res, next) => {
    //We send the auth token in the request headers (req.headers.authToken).
    try {
        // Write the current user from the Firebase to the request object.
        const firebaseUser = await admin
            .auth()
            .verifyIdToken(req.headers.authtoken);
        console.log("FIREBASE USER IN AUTHCHECK", firebaseUser, " end user.");
        req.user = firebaseUser;
        next();
    } catch (err) {  
        res.status(401).json({
            err: "Invalid or expired token",
        });
    }
};

// Second layer of security. Check in the MongoDB database if the user is admin.
exports.mongoDbAdminCheckMiddleware = async (req, res, next) => {
    const { email } = req.user;
    //exec() is used to execute the function and get back a real promise.
    const adminUser = await User.findOne({ email }).exec();
    if (adminUser.role !== "admin") {
        res.status(403).json({
            err: "Admin resource. Access denied.",
        });
    } else {
        next();
    }
};
